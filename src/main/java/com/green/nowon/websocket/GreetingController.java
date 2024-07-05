package com.green.nowon.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {
	
	@MessageMapping("/hello")//controller에 getmapping 하는 것처럼 메시지 매핑을 할 수 있음 (메시지 매핑은 웹소켓 통신 용도)
	@SendTo("/topic/greetings") //구독설정된 클라이언트에게 메세지 전달 
	public Greeting greeting(HelloMessage message) throws Exception {
		Thread.sleep(1000); // simulated delay(사람이 입력해서 온 것처럼 딜레이를 걸어줌)
		System.out.println("클라이언트에서 이름을 객체로 보냈음>>>>"+message.getName());
		return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
	}

}
