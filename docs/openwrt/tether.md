# How to tether your phone to your router by using EasyTether.



There is several reasons you need to share your smartphone's data  to your router:

1. Carriers tries to give you a plan with plenty of data but actually you don't need that much.
2. 4G speed is quite fast and it beats your home Internet speed. You can use the data for your laptop.
3. Using your phone as a hotspot directly is easy, but you cannot connect too many devices.

It is very easy to share your data to GL.iNet mini router using router's control interfaces, but in some phone and carrier network, they limit sharing data directly, so you can try EasyTether.

We will use Android OS and GL mini router to demonstrate the procedure.



## Stuff you need

### A) Equipment

1)     Samsung Galaxy S6 with Android OS

2)     GL-AR150 mini router (Other models are also OK)

3)     4G sim card

### B) Software

1)     WinSCP ([https://winscp.net/eng/download.php](https://winscp.net/eng/download.php))

![WinSCP](http://www.gl-inet.com/wordpress/wp-content/uploads/2017/06/Q4.png)

2)     PuTTY ([https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html))

![PuTTY](http://www.gl-inet.com/wordpress/wp-content/uploads/2017/06/Q3.png)

3)     EasyTether driver openssl ([http://www.mobile-stream.com/easytether/drivers.html](http://www.mobile-stream.com/easytether/drivers.html))

![EasyTether Driver](http://www.gl-inet.com/wordpress/wp-content/uploads/2017/06/Q2.png)

4)     EasyTether Android App (Search in Google Play Store)



## Procedure

### A) Preparing your router

#### *1) Set up the router*

Enter 192.168.8.1 in your browser and get into the router web interface. Set the password which will be used for OpenWRT later. Next, update your router to the latest firmware.

#### *2) Transfer IPK driver package to the router*

***i.*** Find out the chip of your model (for example Atheros 9531, MediaTek MT7620N, etc) from the website. It is because you have to choose the IPK driver package in the EasyTether driver file base on the chip of your router. (For GL router, you can find the information on our website: www.gl-inet.com, and we will also indicate the position of the IPK driver file for our mini router in section iv.):

![Chip model](http://www.gl-inet.com/wordpress/wp-content/uploads/2017/06/Q5.png)

***ii.*** Extract the EasyTether driver file. Open WinSCP, choose SCP as the file protocol and enter the information as the figure shown below:

![WinSCP login](http://www.gl-inet.com/wordpress/wp-content/uploads/2017/06/1.jpg)

You can see the following screen once your connection has been established (left-hand side: Your PC, right-hand side: Your router):

![Screen](http://www.gl-inet.com/wordpress/wp-content/uploads/2017/06/2.png)

***iii.*** Go to the main folder by clicking this button.

 ![Folder](http://www.gl-inet.com/wordpress/wp-content/uploads/2017/06/Q1.png)

You will see the directory tree of the router:

![Directory tree](http://www.gl-inet.com/wordpress/wp-content/uploads/2017/06/3.png)

***iv.*** On the left-hand side (Your PC), find the IPK file of your router in EasyTether driver file you have extracted before. On the right-hand side (Your router), open the tmp folder. Lastly, right click the IPK file and choose upload:

*Note: For Atheros chip, choose 15.05.1\ar71xx\generic. For MediaTeck, choose 15.05.1\ramips\mt7620. For other chips, please find the similar file name.*
*MT300N & MT300A: \15.05.1\ramips\mt7620\ easytether-usb-openssl_0.8.7-1_ramips_24kec.ipk*
*AR150 & AR300M: \15.05.1\ar71xx\generic\easytether-usb-openssl_0.8.7-1_ar71xx.ipk*

![Upload1](http://www.gl-inet.com/wordpress/wp-content/uploads/2017/06/Q11.png)

#### *3) Use SSH to install EasyTether driver*

***i.*** Open PuTTY, enter the IP of your router and other information as the figure shown below, then click Open:

![Putty](http://www.gl-inet.com/wordpress/wp-content/uploads/2017/06/4.png)

***ii.*** Login by using your username and password of the router (username: root; password: same as the one you need for entering the web interface):

*Note: The password you entered will not be showed on the screen.*

![PuTTY](http://www.gl-inet.com/wordpress/wp-content/uploads/2017/06/5.png)

***iii.*** You can now update the OpenWRT modules (internet connection required) by typing:

`opkg update`

Hit enter and then it will update automatically.

*Note: You can skip the update and do it after you have finished tethering.*

***iv.*** Install the driver by typing the following command and then hit enter:

`opkg install /tmp/filename.ipk`

*Note: The filename is the file you uploaded in Procedure A)2.ii.*

***v.*** Type in the following command and hit enter:

`easytether-usb`

***vi.*** Copy the following command to Putty:

```
cat << EOF >> /etc/config/network

config interface 'wan'
option ifname 'tap-easytether'
option proto 'dhcp'
EOF
```

*Note:  To paste it into Putty, just right click the black screen and then hit enter.*

***vii.*** Type in the following command to reboot your router or unplug the power cable of your router. Afterward, plug in the power cable to turn on the router.

`reboot -f`



### B) Preparing your smart phone

#### *1) Enable the Developer Options*

***i.*** Go to Setting -> About Device -> Software info. Hitting the build number several times and it will announce that you have turn on the Developer Options.

![Build number](http://www.gl-inet.com/wordpress/wp-content/uploads/2017/06/XXXXXXX.jpg)

***ii.*** Go to Setting -> Developer Options, turn on the Developer Options and also the USB debugging.

![Developer Options](http://www.gl-inet.com/wordpress/wp-content/uploads/2017/06/XXXX.jpg)

#### *2) Start tethering*

***i.*** Open EasyTether App, tick the USB button, it will show “waiting for connection from the host”. 

![EasyTether App](http://www.gl-inet.com/wordpress/wp-content/uploads/2017/06/Screenshot_20170614-165645.jpg)

***ii.*** Connect your phone to the router via USB cable. Hit OK to allow the USB debugging.

![Connect](http://www.gl-inet.com/wordpress/wp-content/uploads/2017/06/Screenshot_20170614-165701.jpg)

***iii.*** Your connection has been established.

![Connection finished](http://www.gl-inet.com/wordpress/wp-content/uploads/2017/06/Screenshot_20170614-165709.jpg)





You can now connect your device to the router and access the Internet. However, if you are using the lite version of EasyTether app, you will not able to access the website with https like: https://www.youtube.com since this type of secure communication is being blocked by the lite version.





