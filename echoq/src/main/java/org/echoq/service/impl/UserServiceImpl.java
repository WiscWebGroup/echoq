package org.echoq.service.impl;

import org.echoq.entity.Questions;
import org.echoq.entity.User;
import org.echoq.dao.UserMapper;
import org.echoq.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.echoq.util.AESUtils;
import org.echoq.util.FileOperation;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.File;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author HaroldCI
 * @since 2022-05-20
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

    @Resource
    UserMapper mapper;

    @Override
    public int selectUsername(String username) {
        return mapper.selectUsername(username);
    }

    @Override
    public int insertUser(String username, String password) {
        User user = new User();
        user.setUsername(username);
        String encrypted = AESUtils.aesEncryptStr(password, AESUtils.getPkey());
        user.setPassword(encrypted);
        return mapper.insertUser(user);
    }

    @Override
    public int updateUserInfo(User user) {
        return mapper.updateUserInfo(user);
    }

    @Override
    public int updateAvatar(File file) {
        return mapper.updateAvatar(FileOperation.getBase64Image(file));
    }

    @Override
    public int respondQuestion(Questions question) {
        return mapper.respondQuestion(question);
    }

    @Override
    public int updateVisibility(boolean visibility, int questionId) {
        return mapper.updateVisibility(visibility, questionId);
    }

    @Override
    public int deleteUser(int userId) {
        return mapper.deleteUser(userId);
    }

    @Override
    public int deleteQuestion(int questionId) {
        return mapper.deleteQuestion(questionId);
    }



    @Override
    public List<Questions> selectQuestions(int userId) {
        return mapper.selectQuestions(userId);
    }

    @Override
    public List<Questions> selectQuestionsUnanswered(int userId) {
        return mapper.selectQuestionsUnanswered(userId);
    }

    @Override
    public List<Questions> selectQuestionsAnswered(int userId) {
        return mapper.selectQuestionsAnswered(userId);
    }

    @Override
    public List<Questions> selectQuestionConditional(int userId, String condition) {
        if (condition == null || condition == "")
        {
            return selectQuestions(userId);
        }
        if (condition.equals("answered"))
        {
            return selectQuestionsAnswered(userId);
        }
        if (condition.equals("unanswered"))
        {
            return selectQuestionsUnanswered(userId);
        }
        return null;
    }

    @Override
    public List<Questions> searchQuestion(String searchContent) {
        return mapper.searchQuestion(searchContent);
    }

    @Override
    public int selectUser(String username) {
        return mapper.selectUser(username);
    }

    @Override
    public User selectUserInfo(int userId) {
        return mapper.selectUserInfo(userId);
    }



}
