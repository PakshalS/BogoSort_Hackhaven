import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import './meeting.css'

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function Meeting() {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  let myMeeting = async (element) => {

 // generate Kit Token
 const appID = 207904767;
 const serverSecret = "dbdeb608f6609f26f8033419873e63de";
 const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));

 // Create instance object from Kit Token.
 const zp = ZegoUIKitPrebuilt.create(kitToken);
 // start the call
 zp.joinRoom({
        container: element,
        onUserAvatarSetter:(userList) => {
          userList.forEach(user => {
              user.setUserAvatar("https://xxx.xxx.xx/xx.png")
          })
      }, 
        sharedLinks: [
          {
            maxUsers: 100,
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
         mode: ZegoUIKitPrebuilt.VideoConference,
        },
        lowerLeftNotification: {
            showUserJoinAndLeave: true, // Whether to display notifications on the lower left area when participants join and leave the room. Displayed by default.
            showTextChat: true // Whether to display the latest messages on the lower left area. Displayed by default.
          },
          showInviteToCohostButton: true,// Whether to show the button that is used to invite the audience to co-host on the host end          showRemoveCohostButton: true,// Whether to show the button that is used to remove the audience on the host end.
  showRequestToCohostButton:true , // Whether to show the button that is used to request to co-host on the audience end.
          enableUserSearch: true,
        showMyCameraToggleButton: true,
        showRemoveUserButton: true,
        showOnlyAudioUser: true
   });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      
    ></div>
  );
}