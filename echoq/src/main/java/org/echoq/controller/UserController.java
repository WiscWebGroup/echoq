package org.echoq.controller;


import org.echoq.entity.Questions;
import org.echoq.entity.User;
import org.echoq.service.IUserService;
import org.echoq.util.Result;
import org.echoq.util.ResultToken;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

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

    @Resource
    RedisTemplate<String, Object> template;

    @PostMapping("/signup")
    public ResultToken<Integer> signup(@RequestBody User user)
    {
        String username = user.getUsername();
        int replicates = service.selectUsername(username);
        if (replicates > 0)
            return new ResultToken<>(-2, 400, null);
        int response = service.insertUserWithName(user);
        if (response == 1) {
            String uuid = UUID.randomUUID().toString();
            int id = service.selectUser(username);
            template.opsForValue().set(uuid,id);
            // session.setAttribute(uuid, id);
            return new ResultToken<>(1, 200, uuid);
        }
        else
            return new ResultToken<>(-1, 400, null);
    }

    @PostMapping("/signin")
    public ResultToken<Integer> signin(@RequestBody User user)
    {
        String username = user.getUsername();
        String password = user.getPassword();
        int c = service.signin(username, password);
        int userId = service.selectUser(username);
        if (c == 1) {
            String uuid = UUID.randomUUID().toString();
            template.opsForValue().set(uuid,userId);
            // session.setAttribute(uuid, userId);
            return new ResultToken<>(1, 200, uuid);
        }else
            return new ResultToken<>(-1, 400, null);
    }

    @PostMapping("/signout")
    public Result<Integer> signout(HttpServletRequest request)
    {
        String key = request.getHeader("XXX-SToken");
        template.delete(key);
        return new Result<>(1, 200);
    }

    @GetMapping("/getInfo")
    public Result<User> getInfo(HttpServletRequest request)
    {
        String key = request.getHeader("XXX-SToken");
        Integer id = (Integer) template.opsForValue().get(key);
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
    public Result<Integer> update(@RequestBody User user, HttpServletRequest request)
    {
        String key = request.getHeader("XXX-SToken");
        Integer id = (Integer) template.opsForValue().get(key);
        user.setUserid(id);
        /*User usr = new User();
        usr.setUserid(id);
        usr.setName(name);
        usr.setPassword(password);
        usr.setWhatsup(whatsup);
        usr.setColor(color);*/
        int res = service.updateUserInfo(user);
        if (res == 1)
            return new Result<>(1, 200);
        else
            return new Result<>(-1, 400);
    }

    @GetMapping("/selectQuestions")
    public Result<List<Questions>> selectQuestions(String condition, HttpServletRequest request)
    {
        String key = request.getHeader("XXX-SToken");
        Integer id = (Integer) template.opsForValue().get(key);
        List<Questions> questions = service.selectQuestionConditional(id, condition);
        return new Result<>(questions, 200);
    }

    @GetMapping("/getQ/{username}")
    public Result<List<Questions>> selectQuestionsVisible(@PathVariable String username, String condition)
    {
        List<Questions> questions = service.selectQuestionConditionalInvisible(username, condition);
        return new Result<>(questions, 200);
    }


    @PostMapping("updateAvatar")
    public Result<Integer> updateAvatar(MultipartFile img, HttpServletRequest request) throws IOException {
        String key = request.getHeader("XXX-SToken");
        Integer id = (Integer) template.opsForValue().get(key);
        File file = new File("src/main/resources/targetFile.tmp");
        img.transferTo(file);
        int res = service.updateAvatar(file, id);
        if (res == 1)
            return new Result<>(1, 200);
        else
            return new Result<>(-1, 400);
    }

    @PostMapping("respondQuestion")
    public Result<Integer> respondQuestion(int questionId, String response, boolean visibility, HttpServletRequest request)
    {
        String key = request.getHeader("XXX-SToken");
        Integer id = (Integer) template.opsForValue().get(key);
        int confId = service.confirmQuestionBelonging(questionId);
        if (id == confId)
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
        }else
        {
            return new Result<>(-1, 401);
        }
    }

    @PostMapping("/updateVisibility")
    public Result<Integer> updateVisibility(int questionId, boolean visibility, HttpServletRequest request)
    {
        String key = request.getHeader("XXX-SToken");
        Integer id = (Integer) template.opsForValue().get(key);
        int confId = service.confirmQuestionBelonging(questionId);
        if (id == confId)
        {
            int res = service.updateVisibility(visibility, questionId);
            if (res == 1)
                return new Result<>(1, 200);
            else
                return new Result<>(-1, 400);
        }else
            return new Result<>(-1, 401);
    }

    @DeleteMapping("/deleteUser")
    public Result<Integer> deleteUser(HttpServletRequest request)
    {
        String key = request.getHeader("XXX-SToken");
        Integer id = (Integer) template.opsForValue().get(key);
        int res = service.deleteUser(id);
        if (res == 1)
            return new Result<>(1, 200);
        else
            return new Result<>(-1, 400);
    }

    @DeleteMapping("/deleteQuestion")
    public Result<Integer> deleteQuestion(int questionId, HttpServletRequest request)
    {
        String key = request.getHeader("XXX-SToken");
        Integer id = (Integer) template.opsForValue().get(key);
        int confId = service.confirmQuestionBelonging(questionId);
        if (id == confId)
        {
            int res = service.deleteQuestion(questionId);
            if (res == 1)
                return new Result<>(1, 200);
            else
                return new Result<>(-1, 400);
        }else
            return new Result<>(-1, 401);
    }

    @DeleteMapping("/deleteQuestions")
    public Result<Integer> deleteQuestions(int[] questionId, HttpServletRequest request)
    {
        String key = request.getHeader("XXX-SToken");
        Integer id = (Integer) template.opsForValue().get(key);
        int confId = service.confirmQuestionBelonging(questionId[0]);
        if (id == confId)
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
        }else
            return new Result<>(-1, 401);
    }

    @GetMapping("/searchQuestion")
    public Result<List<Questions>> searchQuestion(String searchContent, HttpServletRequest request) {
        String key = request.getHeader("XXX-SToken");
        Integer id = (Integer) template.opsForValue().get(key);
        return new Result<>(service.searchQuestion(id, searchContent), 200);
    }
}

