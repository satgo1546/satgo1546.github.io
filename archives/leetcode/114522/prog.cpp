#include <iostream>
#include <unordered_map>
#include <map>
#include <vector>
#include <array>

using namespace std;
const int ODDS[] = {100, 103, 122, 133, 214, 214, 455, 455, 518, 788};

unordered_map<long long, array<char, 10>> paths;
array<char, 10> path;

void dfs(int round, int streak, long long balance) {
	if (balance < 1) return;
	if (round >= 10) {
		paths[balance] = path;
		return;
	}
	path[round] = 1;
	dfs(round + 1, 0, balance - ((balance + 9) / 10) * 2);
	path[round] = 2;
	dfs(round + 1, 0, balance - ((balance * 3 + 9) / 10) * 2);
	path[round] = 3;
	dfs(round + 1, 0, balance - ((balance * 6 + 9) / 10) * 2);
	path[round] = 4;
	dfs(round + 1, streak + 1, balance + ((balance + 9) / 10 * ODDS[streak] + 99) / 100);
	path[round] = 5;
	dfs(round + 1, streak + 1, balance + ((balance * 3 + 9) / 10 * ODDS[streak] + 99) / 100);
	path[round] = 6;
	dfs(round + 1, streak + 1, balance + ((balance * 6 + 9) / 10 * ODDS[streak] + 99) / 100);
	if (round >= 5) {
		path[round] = 7;
		dfs(round + 1, streak + 1, balance + (balance * ODDS[streak] + 99) / 100);
	}
}

int main() {
	path[0] = 6;
	dfs(0, 0, 8888);
	map<long long, array<char, 10>> sortedPaths(paths.begin(), paths.end());
	for (const auto &result : sortedPaths) {
		cout << result.first << '\t';
		for (const auto &val : result.second) {
			cout << static_cast<int>(val);
		}
		cout << endl;
	}
}
