package org.echoq;

import org.echoq.entity.Questions;
import org.echoq.service.IQuestionsService;
import org.echoq.service.impl.QuestionsServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.annotation.Resource;

@RunWith(SpringRunner.class)
@SpringBootTest
@WebAppConfiguration
public class InsertQuestionTest {

    @Resource
    QuestionsServiceImpl service;



    public static void main(String[] args) {


    }
}
