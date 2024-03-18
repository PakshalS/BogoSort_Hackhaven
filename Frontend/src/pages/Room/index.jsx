import React from 'react'
import {useParams} from 'react-router-dom'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
function Roompage() {
  const { roomId } = useParams()

   const myMeeting = async (element) =>{

    const appID = 207904767;
    const serverSecret = "dbdeb608f6609f26f8033419873e63de";
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  "Pakshal");
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:'http://localhost:3000/room/${roomId}'
        },],
      scenario:{
        mode:ZegoUIKitPrebuilt.VideoConference,
      }
    })
   }

  return (
    <div>
      <div ref={myMeeting}/>

    
      {/* <h1>{roomId} is your RoomID</h1> */}
    </div>
  )
}

export default Roompage
