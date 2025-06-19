#!/usr/bin/env python3
# SPDX-License-Identifier: WTFPL

import requests
import time
import json
import traceback
from pprint import pprint

prev_target = ""
all_messages = [...]


def now() -> str:
    return time.strftime("%Y-%m-%dT%H:%M:%S+08:00", time.localtime())


def popfortune() -> str:
    # 独轮车功能：向fortune.txt倒序添加欲发送的语料，每行一条
    try:
        with open("fortune.txt", "rb+") as f:
            l, _, r = f.read().rpartition(b"\n")
            f.truncate(len(l))
            return r.decode()
    except:
        traceback.print_exc()
        return ""


while True:
    try:
        last_messages = all_messages[-10:]
        response = requests.post("http://101.43.244.76:15135/", data=popfortune().encode())
        if response.status_code == 429:
            print("429")
            time.sleep(5)
            continue
        response = response.json()
        messages = response["messages"]
        for i in range(len(messages)):
            if messages[i : i + len(last_messages)] == last_messages:
                new_messages = messages[i + len(last_messages) :]
                break
        else:
            print("??? 检测到空间波动")
            with open("log.jsonl", "a") as f:
                print("-" * 72)
            new_messages = messages
        all_messages.extend(new_messages)
        pprint(new_messages)
        with open("log.jsonl", "a") as f:
            for l in new_messages:
                print(json.dumps([now(), l], ensure_ascii=False), file=f)
            if response["target"] != prev_target:
                prev_target = response["target"]
                print(json.dumps([now(), "target", prev_target], ensure_ascii=False), file=f)
    except:
        traceback.print_exc()
    time.sleep(10)
