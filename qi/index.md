Gettting started

#Qi Mini Interfaces

The heart of Domino Qi is Qi Mini board, which integrates Domino Core and Atmega32U4 MCU. The functions of Qi Mini is compatible with Arduino Yun.

![Qi Mini Top](src/qi_mini_top.jpg)

On Qi Mini, there are four LEDs:

- <font color=blue>**Blue LED for Wireless**</font>: when radio (ap or client) is on, it will light up.
- <font color=gray> **White LED for USB**</font>: when USB is connected, it will light up. When connected to Qi baseboard, it will always on because on Qi baseboard there is a USB hub.
- <font color=green>**Green LED for Power**</font>: it will always on when power is connected.
- <font color=orange>**Yellow LED for WAN** </font>: it will light up when Ethernet cable is connected.

![Qi Mini Top](src/qi_mini_back.jpg)

On Qi Mini, there are three buttons:

- **9331 Reset**: when pressed, it will perform a hard reset of the 9331 CPU. The OpenWrt Linux will reboot immediately.
- **MCU Reset**: when pressed, it will reset the AVR MCU immediately.
- **User Button**: This button is configured using script. The default actions are: when pressed for 5 seconds and more, it will reset WiFi mode, encryption, password, LAN IP to factory status; when pressed for 30 seconds and more, it will reset the whole system to factory default. e.g. all your change will be erased.

#Qi Assembly

The Qi Mini board use short headers. Put it onto Qi baseboard and press them firmly. On Qi baseboard, the MicroUSB is only for power and we didn't mount it by default. You can just power the kit up using the connector on Qi Mino.

![Qi assembly ](src/qi-assembly.jpg)

To disassemble the kit, you need a little force, as the headers are too tight. Use a pencil or plastic pen, inser into the gap between Qi Mini and the baseboard, apply a little force to lever it up. Don't be too brutal to damage the boards. Don't use a metal tools. 

![Qi assembly ](src/qi-disassembly.jpg)