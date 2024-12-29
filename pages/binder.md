---
title: 活页夹
date: 2015-01-01
---

## 命令行

压缩ZIP
: ```sh
  zip -r -9 b.zip a/
  ```
压缩TAR、TGZ、TAR.BZ、TAR.XZ
: ```sh
  tar -caf b.tar.xz a.dat
  ```
解压TAR、TGZ、TAR.BZ、TAR.XZ
: ```sh
  tar -xavf a.tar.gz
  ```
解压ZIP
: ```sh
  unzip a.zip -O gbk -d b/
  ```
有损GIF
: ```sh
  gifsicle -O3 --lossy=400 -o b.gif a.gif
  ```
高质量OGG
: ```sh
  ffmpeg -i a.wav -q 9 b.ogg
  ```
删除音轨
: ```sh
  ffmpeg -i a.mp4 -c:v copy -an -movflags faststart b.mp4
  ```
提取音轨
: ```sh
  ffmpeg -i a.mp4 -vn -acodec copy b.aac
  ```
无损剪辑（可能产生问题）
: ```sh
  ffmpeg -i a.mp4 -ss 00:12:34.000 -t 00:00:10.000 -c copy -async 1 b.mp4
  ```
合并视频与音轨
: ```sh
  ffmpeg -i a.mp4 -i a.aac -c copy b.mp4
  ```
快速胡乱压缩
: ```sh
  ffmpeg -i a.mp4 -c:v libx264 -preset ultrafast -tune zerolatency -crf 63 -c:a aac -b:a 32k b.mp4
  ```
单文件高压缩
: ```sh
  gzip -v9 a.bin
  ```
转换到高压无损WebP
: ```sh
  cwebp -z 9 a.png -o b.webp
  ```
切片单独保存
: ```sh
  magick a.png -crop 32x32 +repage +adjoin %04d.png
  ```
横向合并图片
: ```sh
  magick *.png +append b.png
  ```
纵向合并图片
: ```sh
  magick *.png -append b.png
  ```
4张图一行（小图文件名有前导零才能正常排序）
: ```sh
  magick montage *.png -mode Concatenate -tile 4x b.png
  ```
降低到16色
: ```sh
  magick a.png -dither Riemersma -colors 16 b.png
  ```
用指定调色板降色
: ```sh
  magick a.png -dither FloydSteinberg -remap colormap.png b.png
  ```
合并RGB和α
: ```sh
  magick a.png α.png -alpha off -compose CopyOpacity -composite b.png
  ```
液化更改图片大小
: ```sh
  magick a.png -liquid-rescale 100x70%! b.png
  ```
每帧单独保存
: ```sh
  ffmpeg -i a.mp4 %d.png
  ```
把PNG序列拼成视频
: ```sh
  ffmpeg -framerate 60 -start_number 1 -i %d.png -pix_fmt yuv420p b.mp4
  ```
同编码视频直接合并
: ```sh
  ffmpeg -i "concat:a.mp4|b.mp4" -c copy c.mp4
  ```
下载m3u8播放列表中的视频
: ```sh
  ffmpeg -protocol_whitelist file,http,https,tcp,tls,crypto -i "http://example.com/a.m3u8" -c copy b.mp4
  ```
编译C++程序
: ```batch
  cl /nologo /Ox /MT a.cpp gdi32.lib user32.lib winmm.lib /link /out:b.exe
  ```
网页/SVG转图（保留α）
: ```batch
  "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --enable-logging "--screenshot=%CD%\b.png" --window-size=640,480 --default-background-color=0 "%CD%\a.html"
  ```
网页/SVG转PDF
: ```batch
  "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --enable-logging "--print-to-pdf=%CD%\b.pdf" --window-size=640,480 --default-background-color=0 "%CD%\a.html"
  ```
命令Chrome在隐者亭台打开
: ```batch
  start "" "chrome" --kiosk --fullscreen --incognito "about:blank"
  ```
JS压缩
: ```sh
  uglifyjs a.js --compress --mangle --output b.js
  ```
JS超强压缩
: ```sh
  java -jar closure-compiler-v….jar --compilation_level ADVANCED_OPTIMIZATIONS --js a.js --js_output_file b.js
  ```
三维边框
: ```sh
  magick a.png -mattecolor SkyBlue -frame 6x6+2+2 b.png
  ```
LaTeX编译缺文件怎么办
: ```sh
  tlmgr search --global --file a.sty
  ```
TeX编译缺TFM怎么办
: ```sh
  mktextfm cmr10
  ```
调试运行METAFONT程序
: ```sh
  mf a.mf && gftodvi a.2602gf && dvipdfmx a.dvi
  ```
解压PDF
: ```sh
  ps2pdf -dCompressPages=false a.pdf b.pdf
  ```
PDF转PNG
: ```sh
  mutool draw -r 300 -o %d.png a.pdf
  ```
  ```batch
  rungs -sDEVICE=pngalpha -o %d.png -r300 a.pdf
  ```
PDF转曲
: ```sh
  gs -o b.pdf -dNoOutputFonts -sDEVICE=pdfwrite -dNOPAUSE -dBATCH -dSAFER a.pdf
  ```
PDF转SVG
: ```sh
  pdftocairo -svg i.pdf
  ```
  ```sh
  mutool convert -F svg i.pdf
  ```
PDF转EPS
: ```sh
  pdftocairo -eps i.pdf
  ```
PDF提取页面
: ```sh
  mutool merge -o b.pdf a.pdf 1,2,3,6-7
  ```
让我看看到底是哪个玩意在拉高全局时钟频率
: ```batch
  clockres & powercfg -energy duration 5
  ```
让我看看到底是哪个玩意在妨碍自动待机
: ```batch
  powercfg /requests
  ```
复制文本内容
: ```batch
  clip < a.txt
  ```
hexdump
: ```batch
  certutil -encodehex a.bin b.txt
  ```
MD5
: ```batch
  certutil -hashfile a.bin MD5
  ```
SHA-1（还支持MD2、MD4、SHA256、SHA384、SHA512）
: ```batch
  certutil -hashfile a.bin SHA1
  ```
让Windows 98蓝屏
: ```batch
  cd C:\CON
  ```
改变hiberfil.sys的大小
: ```batch
  powercfg -h -size 100%
  ```
谁来拯救我的数学
: ```batch
  set/a1+1
  set /a "1+1"
  powershell 1+1
  ruby -e "p 1+1"
  python -c "print(1+1)"
  lua -e "print(1+1)"
  magick null: -format "%[fx:1+1]" info:
  ```
开个服务器
: ```batch
  php -S localhost:8000
  ruby -run -ehttpd . -p8000
  python -m http.server 8000
  busybox httpd -f -p 8000
  "C:\Program Files (x86)\IIS Express\iisexpress.exe" /path:C:\a /port:8000
  ```
显示GUI程序的控制台输出
: ```batch
  a.exe > b.txt
  :: > con是无效的
  ```
Starwars Asciimation（《星球大战》动画）
: ```sh
  telnet towel.blinkenlights.nl
  ```
Windows Server 2016上装商店里的app
: 在<https://store.rg-adguard.net/>上下载.appx包
  管理员PowerShell
  ```powershell
  Add-AppxPackage a.appx
  ```
启用内存压缩
: ```batch
  powershell Enable-MMAgent -MemoryCompression
  ```
创建指定大小的全零文件
: ```batch
  fsutil file createnew b.bin 114514
  ```
echo，但不带行末回车
: ```batch
  set /p=Hello, world!<nul
  ```
下载文件
: ```batch
  bitsadmin /transfer WTF http://example.com/a.htm %cd%\b.htm
  ```
  （但是很慢，不知道为什么）
Ruby带你在Windows上飞
: ```batch
  ruby -run -e cp -- [OPTION] SOURCE DEST
  ruby -run -e ln -- [OPTION] TARGET LINK_NAME
  ruby -run -e mv -- [OPTION] SOURCE DEST
  ruby -run -e rm -- [OPTION] FILE
  ruby -run -e mkdir -- [OPTION] DIRS
  ruby -run -e rmdir -- [OPTION] DIRS
  ruby -run -e install -- [OPTION] SOURCE DEST
  ruby -run -e chmod -- [OPTION] OCTAL-MODE FILE
  ruby -run -e touch -- [OPTION] FILE
  ```
文件资源管理器选项
: ```batch
  rundll32 shell32.dll,Options_RunDLL 0
  ```
  - 0 = 常规
  - 2 = 搜索
  - 7 = 查看
文件资源管理器选项——文件类型
: ```batch
  rundll32 shell32.dll,Control_Options 2
  ```
存储的用户名和密码
: ```batch
  rundll32 keymgr.dll,KRShowKeyMgr
  ```
忘记密码向导
: ```batch
  rundll32 keymgr.dll,PRShowSaveWizardExW
  ```
启用**鼠标 属性** > **切换主要和次要的按钮**
: ```batch
  rundll32 User32.dll,SwapMouseButton
  ```
映射网络驱动器
: ```batch
  rundll32 shell32.dll,SHHelpShortcuts_RunDLL Connect
  ```
所有打印机
: ```batch
  rundll32 shell32.dll,SHHelpShortcuts_RunDLL PrintersFolder
  ```
删除IE浏览数据
: ```batch
  rundll32 inetcpl.cpl,ClearMyTracksByProcess 4351
  ```
  - 1 = 历史记录
  - 2 = cookie
  - 8 = Internet临时文件
  - 16 = 表单数据
  - 32 = 密码
  - 4096 = 扩展程序保存的文件和设置
整理IE收藏夹
: ```batch
  rundll32 shdocvw.dll,DoOrganizeFavDlg
  ```
打开方式
: ```batch
  rundll32 shell32.dll,OpenAs_RunDLL a.ext
  ```
打印机用户界面
: ```batch
  rundll32 printui.dll,PrintUIEntry /?
  ```
  内有很多选项
ProcessIdleTasks
: ```batch
  rundll32 advapi32.dll,ProcessIdleTasks
  ```
安全删除硬件
: ```batch
  rundll32 shell32.dll,Control_RunDLL hotplug.dll
  ```
任务栏属性
: ```batch
  rundll32 shell32.dll,Options_RunDLL 1
  ```

## 指令

在CSGO和Portal中飞
: ```
  sv_cheats 1
  noclip
  ```

## 代码片段

### 用Free Pascal产生DLL

```pascal
library pxx;
function pxx: longint;
export;
begin
	pxx := 20;
end;
exports pxx name 'PxxFunc';
begin
end.
```

### 把stdin/stdout改成二进制模式

```c
#ifdef _WIN32
	#include <io.h>
	#include <fcntl.h>
#endif

int main() {
	#ifdef _WIN32
		setmode(fileno(stdout), O_BINARY);
		setmode(fileno(stdin), O_BINARY);
	#endif
```

## 使用技巧与提示
- 新建的记事本文档，即使在编辑后，只要内容仍为空，关闭时就不会提示保存。
- 右键单击Windows Media Player的播放/暂停按钮，可以改变播放速度。
- Adobe Photoshop：编辑—颜色设置（Shift+Ctrl+K）—更多选项—用灰度系数混合RGB颜色—以消除模糊效果中不和谐的边缘。
- Word中的超链接是域，所以可以用Ctrl+Shift+F9或Ctrl+6批量取消超链接。
- <abbr title="Open Broadcaster Software">OBS</abbr>可以用来录制屏幕。
- 双击窗口左上角的小图标是从Windows 3.1到Windows 11都通用的关闭窗口的方法。
- 在Windows 10中由于系统保护机制，很难还原calc.exe到Win32版本，但是可以在System32中放入Win32版本的calc.com来让运行calc时打开这个。
- KB4516065安装失败，错误代码80092004：先从Microsoft Update Catalog手动下载安装KB4490628，再手动下载安装KB4516065，然后Windows Update又能正常工作。
- PostScript标准35字体可从下列地址下载：git://git.ghostscript.com/urw-core35-fonts.git
- 在Windows 10中关闭Xbox录制可能会解决游戏卡顿和死机的问题。（2020年6月读到此条）
- 重定向符不一定要放在行尾，例：`>>file.txt echo 2`。
- 记事本命令行开关/a指定编码为ANSI，/w指定编码为UTF-16，/p打印文档并关闭。
- 给我把U盘拔出来！资源监视器（perfmon.exe）→CPU→关联的句柄→搜索“U:\”
- Windows 10+[删除“安全删除硬件”托盘图标](https://www.tenforums.com/drivers-hardware/61771-disable-safely-remove-hardware-icon.html)（[关于SysTray在sndvol32中的应用](https://docs.microsoft.com/en-us/windows-hardware/drivers/audio/systray-and-sndvol32)）
  ```batch
  reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Applets\SysTray" /v "Services" /t reg_dword /d 29 /f
  systray
  ```
- list.exe是不卡顿的文本文件/二进制浏览器，在2003 Resource Kit中提供，Windows Debugger Kit里也有。按H进入十六进制编辑，按^I切换左右栏。输入文件名时可按F2复制直到，按F4删除直到。
- Notepad2有若干未明说的功能（搜集自<https://github.com/ProgerXP/Notepad2e>）：
  - 支持矩形选区，按住Alt拖动。This is particularly useful for Column sort in Sort Lines (Alt+O).
  - Web search: if you set `WebTemplate1` (or `WebTemplate2`) setting in the INI to `https://google.com/search?q=%s` and then press Ctrl+Shift+1-2 with non-empty selection - you will be navigated to that URL (`%s` replaced with a selection string, not URL-encoded).
  - If Replace's dialog Replace With is `^c` - clipboard contents is used instead of this string.
  - If the program is started with `/B` flag, it enters "Pasteboard mode" where new content on the clipboard is automatically added to the buffer.
  - `[Custom Colors]` INI section is used to fill the "Custom colors" control of Fore/Back color pickers in Customize Schemes. #149
