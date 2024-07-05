const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/gs-guide-websocket'
});

//stompClient 트리거 - 이벤트가 발동하면 자동으로 실행
stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    //메세지 수신설정 : 서버에서 메시지를 보내면 콜백함수가 실행
    stompClient.subscribe('/topic/greetings', (greeting) => {
        showGreeting(JSON.parse(greeting.body).content);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

//연결, 해제 버튼 활성화 비활성화
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
	var data = $("#name").val().trim();
	
	if(data.length<2){
		alert("이름은 2글자이상 입력하세요")
		return;
	}
	
    stompClient.publish({
        destination: "/app/hello",
        body: JSON.stringify({'name': data})
    });
}

function showGreeting(message) {
    /*$("#greetings").append("<tr><td>" + message + "</td></tr>");*/
    $("#greetings").append(`<tr><td>${message}</td></tr>`);
}

//jquery 문서 로딩되면 시작
$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());
});