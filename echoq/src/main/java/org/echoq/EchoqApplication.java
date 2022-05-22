package org.echoq;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("org.echoq.service")
@ComponentScan("org.echoq.controller")
public class EchoqApplication {

    public static void main(String[] args) {
        SpringApplication.run(EchoqApplication.class, args);
    }

}
