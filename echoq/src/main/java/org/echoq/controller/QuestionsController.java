package org.echoq.controller;


import org.echoq.service.IQuestionsService;
import org.echoq.service.IUserService;
import org.echoq.util.Result;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author HaroldCI
 * @since 2022-05-20
 */
@RestController
@RequestMapping("/questions")
public class QuestionsController {
    @Resource
    IQuestionsService service;

    @Resource
    IUserService userService;

    @PostMapping("/ask/{name}")
    public Result<Integer> askQuestion(@PathVariable() String name, String question, String ip)
    {
        int id = userService.selectUser(name);
        int res = service.insertQuestion(ip, question, id);
        if (res == 1)
            return new Result<>(1, 200);
        else return new Result<>(-1, 400);
    }
}

