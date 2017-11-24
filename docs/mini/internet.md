# Connect the mini router to the Internet

Cable, Repeater, Modem and Tethering

Note: This doc is update on 2017-11-24 and you need to use firmware v2.264.

Note: Most of the pictures in this instructions are for firmware v2.20. Firmware v2.22 may has slightly different interfaces.

## Status

The main UI shows the Internet status, mainly the IP address and protol in the setting area. The data will refresh every several seconds.

You can click the `Internet part` in the Settings bar, you will have tools to change Internet settings.

![Connections](src/internet_status1.jpg)

You can now click "Setting" button or the Internet Icon to pop up Internet settings page.

## DHCP

**DHCP requires you to connect using Internet cable.**

Your main router or ISP should be able to provide such option.

DHCP is the default and most common method to connect to the Internet. You just need to choose `DHCP` and click `Submit`.

![Connections](src/dhcp1.png)

## Static

**Static requires you to connect using Internet cable.**

`Static` is required if you want your router have a fixed IP address given by your ISP or in the same subnet of your main router.

The current settings will be automactically filled in the filed. Change it according to your needs, then click `Submit`.

![Connections](src/static.png)

## PPPoE

`PPPoE` is required by many ISP. Generally they will give you a modem and provide you a username and password.

Fill your `username` and `password` then click `Submit`.

![Connections](src/pppoe.png)

## Repeater (WISP)

Note: **Please check the [Repeater Manager function](../mini/repeater_manager.md)**

Using GLi mini routers, you don't need to have an Ethernet cable to surf the Internet, you can user it as repeater. The most common one is WISP (Wireless Internet Service Provider).

In WISP mode, the mini router act as a firewall and protect you from outside. If you are using a public wifi, you need to use this mode.

In the following diagram, your main router has an IP 192.168.1.1. Suppose its netmask is 255.255.255.0, your mini router will have two IP address:

`192.168.1.99` which is got from your main router

`192.168.8.1` which is created by itself

So all your devices connected to the mini router will be protected by the firewall.

![Connections](src/wisp1.png)

First Click `Repeater` tab in `Internet Settings`, the router will search for the available SSIDs around automatically. Then choose the one your want to repeat and type your password. The `Mode` should be `WISP`, then click `Submit`.

![Connections](src/wisp.png)

## Repeater Bridge (WDS)

In other circumstances, you want to connect to your own router which you trust. You don't need a separate network, you can use Repeater Bridge mode. The most common one is called `WDS`. To use this mode, **your main router has to support WDS**. Consult your main router's manual to check if it has this options.

In WDS mode, the mini router only boost your main router's signal area, not creating a seprate network. There is no firewall between the mini router and the main router.

**OpenVPN client function of the mini router will not work in bridge mode**

![Connections](src/wds.png)

To use WDS repeater, **ensure your main router support WDS**, then choose `WDS` from mode list. You will have an option to input a static IP, which will be used to access this mini router.

If you know the subnet of your main router, for example in this case it is `192.168.1.x`, you can input a static IP, e.g. `192.168.1.99`. This static IP should not conflict with any other devices' IP address. Then later you should access this UI at `http://192.168.1.99`

If you are not sure, just keep the IP address blank so that it will get a IP address from your main router automatically. But you need to find out this IP in your main router's admin UI if you want to access this UI again.

![Connections](src/wds1.png)

## Repeater Bridge (relayd)

In case you are having an old router and it doesn't support WDS, you can use WISP mode then setup a relayd overlay.

Here is [detailed instructions](src/relayd.pdf) of how to do it.

**OpenVPN client function of the mini router will not work in bridge mode**

## 3G/4G Modem and phone tethering



## Clone MAC

Clone MAC is used especially in hotels, hotspot etc when the server checks your mac address. For example, if you got your smartphone registered on the network, you can clone your smartphone's mac address to the router so that the router can connect.

Clieck the `Clone Mac` button and you will have the following interface.

![Connections](src/macclone.jpg)

Your current mac address will be displayed in `WAN MAC Address`. You can click `Clone` to copy your device's mac address or click `Restore` to restore the factory set mac.

Don't forget clicking `Apply` and wait some seconds for it to take effect.

## Custom DNS

You can set up custom dns server for some purpose.

Click `DNS` button you will be able to input custom dns. You can input max two dns servers.

`Force all clients to use` will capture the dns request from all the connected client, for example Google Chrome cast. This option does not need to be used with custom DNS server.

A separate article will be written about DNS.

![Connections](src/dns.jpg)

# Discussions
