package org.echoq.controller;


import org.echoq.entity.Questions;
import org.echoq.entity.User;
import org.echoq.service.IUserService;
import org.echoq.util.Result;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author HaroldCI
 * @since 2022-05-20
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    IUserService service;

    @PostMapping("/signup")
    public Result<Integer> signup(String username, String password, HttpSession session)
    {
        int replicates = service.selectUsername(username);
        if (replicates > 0)
            return new Result<>(-2, 400);
        int response = service.insertUser(username, password);
        if (response == 0) {
            int id = service.selectUser(username);
            session.setAttribute("loginId", id);
            return new Result<>(1, 200);
        }
        else
            return new Result<>(-1, 400);
    }

    @PostMapping("/signin")
    public Result<Integer> signin(String username, String password, HttpSession session)
    {
        int c = service.signin(username, password);
        int userId = service.selectUser(username);
        if (c == 1) {
            session.setAttribute("loginId", userId);
            return new Result<>(1, 200);
        }else
            return new Result<>(-1, 400);
    }

    @GetMapping("/getInfo")
    public Result<User> getInfo(HttpSession session)
    {
        int id = (int) session.getAttribute("loginId");
        User user = service.selectUserInfo(id);
        if (user.getUsername().equals("") || user.getUsername() == null)
        {
            return new Result<>(null, 404);
        }else
        {
            return new Result<>(user, 200);
        }
    }

    @PostMapping("/updateInfo")
    public Result<Integer> update(String name, String password, String whatsup, String color, HttpSession session)
    {
        int id = (int) session.getAttribute("loginId");
        User usr = new User();
        usr.setUserid(id);
        usr.setName(name);
        usr.setPassword(password);
        usr.setWhatsup(whatsup);
        usr.setColor(color);
        int res = service.updateUserInfo(usr);
        if (res == 1)
            return new Result<>(1, 200);
        else
            return new Result<>(-1, 400);
    }

    @GetMapping("/selectQuestions")
    public Result<List<Questions>> selectQuestions(String condition, HttpSession session)
    {
        int id = (int) session.getAttribute("loginId");
        List<Questions> questions = service.selectQuestionConditional(id, condition);
        return new Result<>(questions, 200);
    }

    @GetMapping("/getQ/{username}")
    public Result<List<Questions>> selectQuestionsInvisible(@PathVariable String username, String condition)
    {
        List<Questions> questions = service.selectQuestionConditionalInvisible(username, condition);
        return new Result<>(questions, 200);
    }


    @PostMapping("updateAvatar")
    public Result<Integer> updateAvatar(MultipartFile img, HttpSession session) throws IOException {
        int id = (int) session.getAttribute("loginId");
        File file = new File("src/main/resources/targetFile.tmp");
        img.transferTo(file);
        int res = service.updateAvatar(file);
        if (res == 1)
            return new Result<>(1, 200);
        else
            return new Result<>(-1, 400);
    }

    @PostMapping("respondQuestion")
    public Result<Integer> respondQuestion(int questionId, String response, boolean visibility)
    {
        Questions q = new Questions();
        q.setQuestionid(questionId);
        q.setResponse(response);
        q.setVisibility(visibility);
        int res = service.respondQuestion(q);
        if (res == 1)
            return new Result<>(1, 200);
        else
            return new Result<>(-1, 400);
    }

    @PostMapping("/updateVisibility")
    public Result<Integer> updateVisibility(int questionId, boolean visibility)
    {
        int res = service.updateVisibility(visibility, questionId);
        if (res == 1)
            return new Result<>(1, 200);
        else
            return new Result<>(-1, 400);
    }

    @DeleteMapping("/deleteUser")
    public Result<Integer> deleteUser(HttpSession session)
    {
        int id = (int) session.getAttribute("loginId");
        int res = service.deleteUser(id);
        if (res == 1)
            return new Result<>(1, 200);
        else
            return new Result<>(-1, 400);
    }

    @DeleteMapping("/deleteQuestion")
    public Result<Integer> deleteQuestion(int questionId)
    {
        int res = service.deleteQuestion(questionId);
        if (res == 1)
            return new Result<>(1, 200);
        else
            return new Result<>(-1, 400);
    }

    @DeleteMapping("/deleteQuestions")
    public Result<Integer> deleteQuestions(int[] questionId)
    {
        boolean isSucceed = true;
        for (int i = 0; i < questionId.length; i ++)
        {
            int res = service.deleteQuestion(questionId[i]);
            if (res != 1)
                isSucceed = false;
        }
        if (isSucceed)
            return new Result<>(1, 200);
        else
            return new Result<>(-1, 400);
    }

    @GetMapping("/searchQuestion")
    public Result<List<Questions>> searchQuestion(String searchContent, HttpSession session) {
        int userId = (int) session.getAttribute("loginId");
        return new Result<>(service.searchQuestion(userId, searchContent), 200);
    }
}

