/**
 * @author Ryan
 * @description 
 *  - Node.js Chatting Server
 *  Node 내장 모듈인 http 모듈을 통해 http 서버를 구축함
 *  socketio 모듈을 통해 채팅 기능을 만들었다. 
 */


const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(function(req, res){

}).listen(3000, function(){
    console.log('Chatting Server running 3000');
});

// 소켓 서버를 생성한다.
const io = socketio.listen(server);

//클라이언트와 서버와 소켓을 연결한다. socket.id 하면 소켓 정보 값을 볼 수 있다.
io.sockets.on('connection', function (socket){

    //방의 접속하는 이벤트 join이 접속
    socket.on('join', function(data){

      //data : 클라이언트에게 방이름을 받아 접속한다.
      socket.join(data);

    });

    //같은 방에 속한 클라이언트에게 메세지를 전달하는 이벤트
    socket.on('clientMessage', function(data){

        /*클라이언트에서 보내 메시지 JSON 형태 이다.
          {
            room: 방 이름,
            message: 메시지,
          } 
        */
        /*io.socket.in = io.sockets 객체의 in()메소드를 사용해
         *현재 접속한 유저 중 같은 방을 있는 유저를 찾는다.
         *찾은 유저에게 emit 메소드를 사용하여 메세지를 보낸다. 
         *io.sockets.in(room).emit('serverMessage', data);
        */ 
        
         const message = {user : data.user , message : data.message};
         io.sockets.in(data.room).emit('serverMessage', message);

        //  console.log('현재 생성된 모든 room 목록을 가져온다. : '+ io.sockets.adapter.rooms);
        //  console.log('현재 방의 모든 유저를 불러온다. : '+ io.sockets.adapter.sids);
      });

      /**채팅방 나가기**/
      socket.on('disconnect', function(data){

        socket.leave(data);

        // console.log('방나가기 현재 방의 모든 유저를 불러온다. : '+ io.sockets.clients(data));

      });
});