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
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

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
            template.opsForValue().set(uuid,id,1, TimeUnit.DAYS);
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
        if (c == 1) {
            int userId = service.selectUser(username);
            String uuid = UUID.randomUUID().toString();
            template.opsForValue().set(uuid,userId,1, TimeUnit.DAYS);
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
        if(key == null || key.equals(""))
            return new Result<>(null, 401);
        Integer id = (Integer) template.opsForValue().get(key);
        if (id == null)
            return new Result<>(null, 401);
        User user = service.selectUserInfo(id);
        if (user.getUsername().equals("") || user.getUsername() == null)
        {
            return new Result<>(null, 404);
        }else
        {
            return new Result<>(user, 200);
        }
    }

    @PostMapping("/updateInfoName")
    public Result<Integer> updateName(@RequestBody User user, HttpServletRequest request)
    {
        String key = request.getHeader("XXX-SToken");
        if(key == null || key.equals(""))
            return new Result<>(null, 401);
        Integer id = (Integer) template.opsForValue().get(key);
        if (id == null)
            return new Result<>(null, 401);
        user.setUserid(id);
        int res = service.updateUserName(user);
        if (res == 1)
            return new Result<>(1, 200);
        else
            return new Result<>(-1, 400);
    }

    @PostMapping("/updateInfoPassword")
    public Result<Integer> updatePassword(@RequestBody User user, HttpServletRequest request)
    {
        String key = request.getHeader("XXX-SToken");
        if(key == null || key.equals(""))
            return new Result<>(null, 401);
        Integer id = (Integer) template.opsForValue().get(key);
        if (id == null)
            return new Result<>(null, 401);
        user.setUserid(id);
        int res = service.updateUserPassword(user);
        if (res == 1)
            return new Result<>(1, 200);
        else
            return new Result<>(-1, 400);
    }

    @PostMapping("/updateInfoAvatar")
    public Result<Integer> updateAvatar(MultipartFile img, HttpServletRequest request) throws IOException {
        String key = request.getHeader("XXX-SToken");
        if(key == null || key.equals(""))
            return new Result<>(null, 401);
        Integer id = (Integer) template.opsForValue().get(key);
        if (id == null)
            return new Result<>(null, 401);
        File file = null;
        file = File.createTempFile("img", "jpg");    //注意下面的 特别注意！！！
        img.transferTo(file);
        int res = service.updateAvatar(file, id);
        file.deleteOnExit();
        if (res == 1)
            return new Result<>(1, 200);
        else
            return new Result<>(-1, 400);
    }

    @PostMapping("/updateInfoWhatsup")
    public Result<Integer> updateWhatsup(@RequestBody User user, HttpServletRequest request) {
        String key = request.getHeader("XXX-SToken");
        if(key == null || key.equals(""))
            return new Result<>(null, 401);
        Integer id = (Integer) template.opsForValue().get(key);
        if (id == null)
            return new Result<>(null, 401);
        user.setUserid(id);
        int res = service.updateUserWhatsup(user);
        if (res == 1)
            return new Result<>(1, 200);
        else
            return new Result<>(-1, 400);
    }

    @GetMapping("/selectQuestions")
    public Result<List<Questions>> selectQuestions(String condition, HttpServletRequest request)
    {
        String key = request.getHeader("XXX-SToken");
        if(key == null || key.equals(""))
            return new Result<>(null, 401);
        Integer id = (Integer) template.opsForValue().get(key);
        if (id == null)
            return new Result<>(null, 401);
        List<Questions> questions = service.selectQuestionConditional(id, condition);
        return new Result<>(questions, 200);
    }

    @GetMapping("/getQ/{id}")
    public Result<List<Questions>> selectQuestionsVisible(@PathVariable Integer id, String condition, String ip)
    {
        List<Questions> questions = service.selectQuestionConditionalInvisible(id, condition, ip);
        return new Result<>(questions, 200);
    }

    @GetMapping("/userDisplayInfo")
    public Result<User> selectUserDisplayInfo(Integer userId)
    {
        return new Result<>(service.selectUserDisplayInfo(userId), 200);
    }

    @PostMapping("/respondQuestion")
    public Result<Integer> respondQuestion(@RequestBody QuestionVO questionVO, HttpServletRequest request)
    {
        String key = request.getHeader("XXX-SToken");
        if(key == null || key.equals(""))
            return new Result<>(null, 401);
        Integer id = (Integer) template.opsForValue().get(key);
        if (id == null)
            return new Result<>(null, 401);
        int confId = service.confirmQuestionBelonging(questionVO.questionid);
        if (id == confId)
        {
            Questions q = new Questions();
            q.setQuestionid(questionVO.questionid);
            q.setResponse(questionVO.response);
            q.setVisibility(questionVO.visibility);
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
        if(key == null || key.equals(""))
            return new Result<>(null, 401);
        Integer id = (Integer) template.opsForValue().get(key);
        if (id == null)
            return new Result<>(null, 401);
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
        if(key == null || key.equals(""))
            return new Result<>(null, 401);
        Integer id = (Integer) template.opsForValue().get(key);
        if (id == null)
            return new Result<>(null, 401);
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
        if(key == null || key.equals(""))
            return new Result<>(null, 401);
        Integer id = (Integer) template.opsForValue().get(key);
        if (id == null)
            return new Result<>(null, 401);
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
        if(key == null || key.equals(""))
            return new Result<>(null, 401);
        Integer id = (Integer) template.opsForValue().get(key);
        if (id == null)
            return new Result<>(null, 401);
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
    public Result<List<Questions>> searchQuestion(String searchContent, String condition, HttpServletRequest request) {
        String key = request.getHeader("XXX-SToken");
        if(key == null || key.equals(""))
            return new Result<>(null, 401);
        Integer id = (Integer) template.opsForValue().get(key);
        if (id == null)
            return new Result<>(null, 401);
        return new Result<>(service.searchQuestion(id, searchContent, condition), 200);
    }

    @GetMapping("/searchQuestionUser")
    public Result<List<Questions>> searchQuestionUser(Integer id, String searchContent, String condition, String ip) {
        if (id == null)
            return new Result<>(null, 401);
        return new Result<>(service.searchQuestionUser(id, searchContent, condition, ip), 200);
    }

    @GetMapping("/selectQuestionsInvIP")
    public Result<List<Questions>> selectQuestionsInvIP(Integer userId, String ip, Boolean visibility, Boolean answered)
    {
        return new Result<>(service.selectQuestionsInvIP(userId, ip, visibility, answered), 200);
    }

private static class QuestionVO {
    Integer questionid;
    String response;
    boolean visibility;

    public boolean isVisibility() {
        return visibility;
    }

    public void setVisibility(boolean visibility) {
        this.visibility = visibility;
    }

    public Integer getQuestionid() {
        return questionid;
    }

    public void setQuestionid(Integer questionid) {
        this.questionid = questionid;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
}

