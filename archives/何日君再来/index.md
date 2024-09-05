---
title: CCBC 1314解题报告/何日君再来
date: 2024-08-16
dates:
tags:
- puzzle hunt
---

<div>队伍：该队伍已注销<br>
报告：piscesciurus</div>

<figure>
<blockquote>
<p>不要取关！会有何日君再来！
</blockquote>
<figcaption>CCBC 15成就</figcaption>
</figure>

《何日君再来》这道题目严格说来不需要编程求解，但它以程序的方式呈现，其中涉及到的诸多概念来自离散数学和自动机理论。不做完小题答案更是无法爆破得到最终答案，吓跑了很多选手。它在赛后问卷评分中仅次于传奇SG函数题《奇怪的游戏》，与《五彩斑斓的黑白》并列倒数第二。

不过，作为后排队伍，有充足的信用点的话，甚至可以直接购买本题的所有提示，立即通过本题。

## 何日君再来

[原题](https://archive.cipherpuzzles.com/index.html#/problem?c=ccbc13/problems/CCBC-14/29)

<div>解题：piscesciurus</div>

> 解题过程不需要阅读以下代码

```ruby
# 何日君再来

# 0.
                                      ####                                     
                                    #######                                    
            #                 ##########                                       
           ##               ##############                                     
          ####                   ##########                       ###          
     ###  ####    ##              ###   ####          #####      ######        
   #################             ###                    #####   ####           
     ###############            ###                       #########            
          ####    ##            ###                         ######             
           ###                                          ###########            
             #                                     ##########   ####           
                                                   #####         ###           
                                                                 ##            

# 1.
0
# mod = 11887954948017136050930299852901473663961901201030041775

# 2.
1
# mod = 8123429576491463905379

# 3.
0
# mod = 864304312523718725659009

# 4.
# ┌----------------+----------------------------------------------------┐
# v                |                                                    |
  01000100101000001100111011110111001000010111011001010101111100010011101

# 5.
0110111000000000111111100010001111111000000011111111100011111000100010001000110

# 6.
             #                        
             ###                      
                #                     
               ##                     
                                      
                                      
       ##                    #        
       ##        ###        # #       
                 ###         #        
                 #                    
                    #                 
                                      
                 #####                
                   #  ##              
                     ##               
                     #              ##
                                    ##
                                      
                                      
                                      
                                      
                                      
##                                    
##              #                     
               ##                     
              ##  #                   
                #####                 
                                      
                 #                    
                    #                 
        #         ###                 
       # #        ###        ##       
        #                    ##       
                                      
                                      
                     ##               
                     #                
                      ###             
                        #             

# 7.
# 2010001001010000011001110111101110010000101110110010101011111000100111012
#                                                                         B
#    0   1   2
# A 1RB 0LA 2RB
# B 0RB 1RB 2LA

# 解题过程不需要阅读以下代码
eval$s=%w~d=%q!^]bm=V<DI1>>D7EFq*LdICM-xgU]K;V@Wwsq/8;HTCB#e^tAp$.0(Vp1*wn_#.76&
vbnDyu;$M7PoyhHSl#n$Cbid0^(6VvLzOHU8Yib[?Wlt&JCeDt1]Kyt.Z'tF5n<W_PtRbi<K3X=z9Vxf
+UhD$_OkB+xY9x7CbQR}hS4Th]>u:7J6cr@g}6#wo){=XH<si@@}LTe%_MK/X6_9+<duM=<{l5y|qkCK
+&qHtaij,;&Z1ufQY-DU+i.v}0qo,)].(+CE?#1@yq[&#AwbA,[)5Y#0V6uhr(K@DSDUe)fRwVcp)1n8
w:V0&+-owtG}FmAoHq5e=j%+LtawSCgFScVkNURPIexFX6[iu`uJwW6ts<4;RCoqEICw_u%%?S)PwtmA
eH_o8v&OHBs&4_Z'w.PJ2k9{#OdFtNpAAYFJjJVLcPZI9U,kus'1Ah*P-/yF%E39MRrVPF}x7P0M>Mm?
um<nO7.@V?-52?&C8JD_R$p)EI%vc}-CNhNS7$)43)8Zb,r1xzUbFAx'G9dKPEkSJK&l%vh[o>9wE}2f
l7#AL')A?f%>r15bRM=!;f=%q!l#dA'_O?4(CK4kEH-$6?U|WwMuXjVW:mY'*KGM+F}`IgNJ:Dj-yEqU
d#e_.j:UVG&FX%VkTn21G$34|/8Sg/VG^'LA0-S{[K?>Xe<f.PsvgNGP}zW9e;NM,saHE`eTr;_d]{TQ
v|VEcS8jcmG;})p(P^`G/*<uyz|<;s*4m5'k$WvBi)J{F`Jrw[+P(=x7HD7t.YQe3v+7:JLL/[W[jJDm
EVpBz/SIlsf0zFj2Hyl1VQ,KXblkd2d=-&qR}gBdeK8}uHJ+0VG^ZLXcacvXh<b-p,uT0(N}NWn(XGBy
4vhvJ'oQRyL%6].[eIwqOLqNfE4molWh_q34FZ=<>N4*L^'z+n`7azr7k>+&-l4J-Eawvcai[z4i,;G)
qL|GEM8*Eh''$me3K3A2sFCB;cVqe(Y$gR]|+msS/?B^Bd43+)jc2zZW>p2e!;g=%q!yUzr[@u=5n-z+
o/e>'|]r<oBo,}rHe-vE$IigDo-eK}nBz`vQi9?6Le4oJnRNlMyn8lR)?D|7J,=J0-`u*IW'LqO8-K/4
>iNF|_TI7SfuttYr4K'E*(1/a;@Asr?I%]DxbrlRB`{HYI.6j;r=&(f,o-Te3pfxNecxh|]R8LD5/jC-
NM]7&H>m@)-gi*u(9l&`K%7.9&PMt1h'|OK(,3s?%0/=A,?$jLGo4qslQ=j}1vJC0_QEP<B4.PBP}Opd
X^*7Lq*ZJTog#V]'Mi/.3n94tua^HgZd@-%j4x]J%4:F5v5.k.=?Brp5:Y:vx?e}+H-jfNG4nuu9%adJ
SWCH|>Suv&G5}CyOTK|%;cbzwb}$JKD$sXa^INc17Q3(o-uuY@Rt2dkB{4?4xRj?)>9DFm;sTGXMqd%(
F0)zyQJDlT/zCopP[KkkKWl}^14xIf5aJ6{qA;zj&F0eGKElP(&_A;qeoIz+B#nc=^j^hFX4x.,(`zU%
Q%,1#).M[KyVw35_jCq/>_3xUu>{11DXJa{R5c^Xj2bb+U}C}Ykmf!;require"zlib";cs=->s{Zlib
::Deflate::deflate(s).unpack("H*")[0].to_i(16).digits(90).reverse.map{|c|c+(c<33
?93:2)}.pack"C*"};ds=->d{m=0;d.unpack("C*").map{|c|m=m*90+(c-2)%91};Zlib::Inflat
e::inflate(["%x"%m].pack"H*")};s=eval(ds.(f));w=126.chr;l=->t{80-t.length%80};o=
"eval$s=%w#{w}d=%q!#{cs.(Marshal.dump(s))}!;"+$s[$s.index("!;f=%q!")+2..];3.time
s{o.chomp!('#')};l.(o)<4?o+="#"*l.(o):0;o+=w+'*""';eval(ds.(g));while(o!="");put
s(o.slice!(0,80));end~*""
```

题目给出了一个Ruby程序，需要选手运行，运行结果为又一个Ruby程序，类似自我生成程序（quine），但产生的程序与原程序有细微不同，这同时体现在注释和代码中。上述程序的运行结果如下：

```ruby
# 何日君再来

# 0.
                                       ####                                    
                                     #######                                   
           #                   ##########                                      
          ##                 ##############                                    
         ####                     ##########                       ###         
    ###  ####    ##                ###   ####          #####      ######       
  #################               ###                    #####   ####          
    ###############              ###                       #########           
         ####    ##              ###                         ######            
          ###                                            ###########           
            #                                       ##########   ####          
                                                    #####         ###          
                                                                  ##           

# 1.
1
# mod = 11887954948017136050930299852901473663961901201030041775

# 2.
2
# mod = 8123429576491463905379

# 3.
1
# mod = 864304312523718725659009

# 4.
# ┌----------------+----------------------------------------------------┐
# v                |                                                    |
  00100010010100000110011101111011100100001011101100101010111110001001110

# 5.
0110101011111110100000101000101000001011111010000000101010001010001000100010110

# 6.
             #                        
             ###                      
                #                     
               ##                     
                                      
                                      
       ##         #          #        
       ##        # #        # #       
                #  #         #        
                 # #                  
                                      
                  #  #                
                  #####               
                   #   #              
                    ## #              
                     ##             ##
                                    ##
                                      
                                      
                                      
                                      
                                      
##                                    
##             ##                     
              # ##                    
              #   #                   
               #####                  
                #  #                  
                                      
                  # #                 
        #         #  #                
       # #        # #        ##       
        #          #         ##       
                                      
                                      
                     ##               
                     #                
                      ###             
                        #             

# 7.
# 2010001001010000011001110111101110010000101110110010101011111000100111012
#                                                                        A 
#    0   1   2
# A 1RB 0LA 2RB
# B 0RB 1RB 2LA

# 解题过程不需要阅读以下代码
eval$s=%w~d=%q!6j/iDi.29QX=WAVg?<8X7-QI;=LT97drq_*gj&qq+kSGqU[u.jvaW;pw,n.*oH.Nd
|]44YHn^dm2@b4(=j]Va%Y7?-NEF@SH%mH}:&lC62cWm?KXfC'?i#PEd|z0zQieGvxt.(WRr&1%C#g$i
mbK[H_7A[6EcMtEg8oNojqH1GI[:CUs}En_W9$;s$Kiq?[I=NLt6l.CG<),sLBwCsQ99UfB>J26mc$+1
Kr10#s,9jPhkCeZpNLM'WMb6xNdrUup?6=_P4WF#2qc]+nD1j+BUXRQ(p<hUFS/a.`&]6(A^WB'H.0z<
Ya23}V1h:X.MQ5jh|9[k1pXUzP2jKiobf?eLD_F[S43jb*^Q]T`b{z[Dvb,w{BPdzBnGZXFdCUy[0Zq9
mJ_>)F*j71e6EvRUKY<`)-(_(prZt(5>SEdUwg}h0>{e.3^B.xAPk{o+%?*X(pxVh_A{T-M8VuX'kpj4
N-z<R]}[#[)X5B^y-p,:y[}PzrcM#|LsZPLddX&B/f(4B/Rux{o/3>L@pn%G6Iv*Vc<mtI#o'{xkfa49
=X7uRH9-Vi9kq?_<1w)6S->3<4Y8((AF#9H7R-:p{Cyl!;f=%q!l#dA'_O?4(CK4kEH-$6?U|WwMuXjV
W:mY'*KGM+F}`IgNJ:Dj-yEqUd#e_.j:UVG&FX%VkTn21G$34|/8Sg/VG^'LA0-S{[K?>Xe<f.PsvgNG
P}zW9e;NM,saHE`eTr;_d]{TQv|VEcS8jcmG;})p(P^`G/*<uyz|<;s*4m5'k$WvBi)J{F`Jrw[+P(=x
7HD7t.YQe3v+7:JLL/[W[jJDmEVpBz/SIlsf0zFj2Hyl1VQ,KXblkd2d=-&qR}gBdeK8}uHJ+0VG^ZLX
cacvXh<b-p,uT0(N}NWn(XGBy4vhvJ'oQRyL%6].[eIwqOLqNfE4molWh_q34FZ=<>N4*L^'z+n`7azr
7k>+&-l4J-Eawvcai[z4i,;G)qL|GEM8*Eh''$me3K3A2sFCB;cVqe(Y$gR]|+msS/?B^Bd43+)jc2zZ
W>p2e!;g=%q!yUzr[@u=5n-z+o/e>'|]r<oBo,}rHe-vE$IigDo-eK}nBz`vQi9?6Le4oJnRNlMyn8lR
)?D|7J,=J0-`u*IW'LqO8-K/4>iNF|_TI7SfuttYr4K'E*(1/a;@Asr?I%]DxbrlRB`{HYI.6j;r=&(f
,o-Te3pfxNecxh|]R8LD5/jC-NM]7&H>m@)-gi*u(9l&`K%7.9&PMt1h'|OK(,3s?%0/=A,?$jLGo4qs
lQ=j}1vJC0_QEP<B4.PBP}OpdX^*7Lq*ZJTog#V]'Mi/.3n94tua^HgZd@-%j4x]J%4:F5v5.k.=?Brp
5:Y:vx?e}+H-jfNG4nuu9%adJSWCH|>Suv&G5}CyOTK|%;cbzwb}$JKD$sXa^INc17Q3(o-uuY@Rt2dk
B{4?4xRj?)>9DFm;sTGXMqd%(F0)zyQJDlT/zCopP[KkkKWl}^14xIf5aJ6{qA;zj&F0eGKElP(&_A;q
eoIz+B#nc=^j^hFX4x.,(`zU%Q%,1#).M[KyVw35_jCq/>_3xUu>{11DXJa{R5c^Xj2bb+U}C}Ykmf!;
require"zlib";cs=->s{Zlib::Deflate::deflate(s).unpack("H*")[0].to_i(16).digits(9
0).reverse.map{|c|c+(c<33?93:2)}.pack"C*"};ds=->d{m=0;d.unpack("C*").map{|c|m=m*
90+(c-2)%91};Zlib::Inflate::inflate(["%x"%m].pack"H*")};s=eval(ds.(f));w=126.chr
;l=->t{80-t.length%80};o="eval$s=%w#{w}d=%q!#{cs.(Marshal.dump(s))}!;"+$s[$s.ind
ex("!;f=%q!")+2..];3.times{o.chomp!('#')};l.(o)<4?o+="#"*l.(o):0;o+=w+'*""';eval
(ds.(g));while(o!="");puts(o.slice!(0,80));end~*""
```

正常的解法是运行程序，观察源代码与输出结果的不同之处，推断出每小题的变化规律。但是……

**让我访问！**

我把混淆拆解了。

本题充分利用了Ruby语法的混沌。[哈哈哈，其他语言做得到吗？](https://prts.wiki/w/%E6%8B%89%E6%99%AE%E5%85%B0%E5%BE%B7/%E8%AF%AD%E9%9F%B3%E8%AE%B0%E5%BD%95)


首先把%w~~括起的字符串$s拆开
得到d、f、g三个%q!!括起的字符串
d是当前状态
f是状态转移函数
g是输出用子程序
cs为压缩+编码的λ
ds为解码+解压的λ
因此只要读出f程序就能立即知道规律
f首先执行了下列语句
s = Marshal.load(ds.(d))
从外层作用域中读取了状态d
然后进行右列中的计算
具体算法在右列中说明
这样就完全跳过了观察和猜测

