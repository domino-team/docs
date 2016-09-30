Working with uboot
=================

Fimilar with uboot is a must skill that you should master in order to play with the routers.

About uboot
-----------
Uboot (universial bootloader) is the bootloader we used on our boards and routers to start OpenWrt Linux. The bootloader is heavly depends on the hardware so almost each hardware requires one boot loader.

To use the bootloader, you have to use <a href='http://domino.io/#!diy/serial.md'>connect a UART serial connector</a>.

Taking our Atheros 9331 boards for example, when powered up, the uboot will output the following text:
```
*********************************************
*   U-Boot 1.1.4  (Sep  9 2014, 09:20:16)   *
*********************************************

AP121 (AR9331) U-Boot for GL.iNet

DRAM:   64 MB DDR 16-bit
FLASH:  Winbond W25Q128 (16 MB)
CLOCKS: 400/400/200/33 MHz (CPU/RAM/AHB/SPI)

LED on during eth initialization...

Hit any key to stop autobooting:  0
```
Press any key quicly to stop booting.

Using uboot
-------------
Uboot is very useful to save your router. Here is some useful command in uboot.

`printenv` print out the environment variables

```
uboot> printenv
bootargs=console=ttyS0,115200 root=31:02 rootfstype=squashfs init=/sbin/init mtdparts=ar7240-nor0:128k(u-boot),1024k(kernel),2816k(rootfs),64k(config),64k(ART)
bootcmd=bootm 0x9F020000
bootdelay=1
baudrate=115200
ipaddr=192.168.1.1
serverip=192.168.1.2
bootfile="firmware.bin"
loadaddr=0x80800000
ncport=6666
uboot_addr=0x9F000000
uboot_name=uboot.bin
uboot_size=0x10000
uboot_upg=if ping $serverip; then tftp $loadaddr $uboot_name && if itest.l $filesize == $uboot_size; then erase $uboot_addr +$filesize && cp.b $loadaddr $uboot_addr $filesize && echo OK!; else echo ERROR! Wrong file size!; fi; else ERROR! Server not reachable!; fi
firmware_addr=0x9F020000
firmware_name=firmware.bin
firmware_upg=if ping $serverip; then tftp $loadaddr $firmware_name && erase $firmware_addr +$filesize && cp.b $loadaddr $firmware_addr $filesize && echo OK!; else ERROR! Server not reachable!; fi
stdin=serial
stdout=serial
stderr=serial
ethact=eth0

Environment size: 937 bytes

uboot>
```
`md` displays data in flash or memory. The following command displays the data in flash from beginning, which is the binary of uboot itself.
```
uboot> md 0x9f000000
9F000000: 100000FF 00000000 100000FD 00000000    ................
9F000010: 1000018E 00000000 1000018C 00000000    ................
9F000020: 1000018A 00000000 10000188 00000000    ................
9F000030: 10000186 00000000 10000184 00000000    ................
9F000040: 10000182 00000000 10000180 00000000    ................
9F000050: 1000017E 00000000 1000017C 00000000    ...~.......|....
9F000060: 1000017A 00000000 10000178 00000000    ...z.......x....
9F000070: 10000176 00000000 10000174 00000000    ...v.......t....
9F000080: 10000172 00000000 10000170 00000000    ...r.......p....
9F000090: 1000016E 00000000 1000016C 00000000    ...n.......l....
9F0000A0: 1000016A 00000000 10000168 00000000    ...j.......h....
9F0000B0: 10000166 00000000 10000164 00000000    ...f.......d....
9F0000C0: 10000162 00000000 10000160 00000000    ...b.......`....
9F0000D0: 1000015E 00000000 1000015C 00000000    ...^.......\....
9F0000E0: 1000015A 00000000 10000158 00000000    ...Z.......X....
9F0000F0: 10000156 00000000 10000154 00000000    ...V.......T....
```

'tftp' is used to download the firmware to the board.

[to do]

Compiling uboot
---------------

We are using [Pepe2k's](https://github.com/pepe2k/u-boot_mod) uboot, you can download the source from github.
```
$ git clone https://github.com/pepe2k/u-boot_mod.git
$ cd u-boot_mod
```
To compile the source, you need to have a cross complier toolchain. I am using openwrt toolchain. Make modification to the `Makefile`.

```cmake
export BUILD_TOPDIR=$(PWD)
export STAGING_DIR=$(BUILD_TOPDIR)/tmp

export TOOLPATH=$(BUILD_TOPDIR)/../openwrt/staging_dir/toolchain-mips_34kc_gcc-4.8-linaro_uClibc-0.9.33.2/
export PATH:=$(TOOLPATH)/bin:${PATH}

export MAKECMD=make --silent --no-print-directory ARCH=mips CROSS_COMPILE=mips-openwrt-linux-uclibc-

# boot delay (time to autostart boot command)
export CONFIG_BOOTDELAY=1
```

Now start to compile the source. For example, for GL.iNet 6416, you can use:

```
make gl-inet

```
It should be very quick and finish in minutes. Then you will find `uboot_for_gl-inet.bin` in `bin/`.

## Discussions
