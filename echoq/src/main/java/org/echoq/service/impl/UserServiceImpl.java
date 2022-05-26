package org.echoq.service.impl;

import com.baomidou.mybatisplus.core.toolkit.AES;
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
    public int insertUserWithName(User user) {
        String password = user.getPassword();
        String encrypted = AESUtils.aesEncryptStr(password, AESUtils.getPkey());
        user.setPassword(encrypted);
        return mapper.insertUserWithName(user);
    }

    @Override
    public int signin(String username, String password) {
        return mapper.signin(username, AESUtils.aesEncryptStr(password, AESUtils.getPkey()));
    }

    @Override
    public int updateUserInfo(User user) {
        user.setPassword(AESUtils.aesEncryptStr(user.getPassword(), AESUtils.getPkey()));
        return mapper.updateUserInfo(user);
    }

    @Override
    public int updateUserName(User user) {
        return mapper.updateUserName(user);
    }

    @Override
    public int updateUserPassword(User user) {
        user.setPassword(AESUtils.aesEncryptStr(user.getPassword(), AESUtils.getPkey()));
        return mapper.updateUserPassword(user);
    }

    @Override
    public int updateUserWhatsup(User user) {
        return mapper.updateUserWhatsup(user);
    }

    @Override
    public int updateAvatar(File file, int userId) {
        return mapper.updateAvatar(FileOperation.getBase64Image(file), userId);
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
    public int confirmQuestionBelonging(int questionId) {
        return mapper.confirmQuestionBelonging(questionId);
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
    public List<Questions> selectQuestionsInv(Integer userId) {
        return mapper.selectQuestionsInv(userId);
    }

    @Override
    public List<Questions> selectQuestionsUnansweredInv(Integer userId) {
        return mapper.selectQuestionsUnansweredInv(userId);
    }

    @Override
    public List<Questions> selectQuestionsAnsweredInv(Integer userId) {
        return mapper.selectQuestionsAnsweredInv(userId);
    }

    @Override
    public List<Questions> selectQuestionsInvIP(int userId, int ip, boolean visibility, boolean answered) {
        if(visibility)
        {
            if(answered)
            {
                return mapper.selectQuestionsAnsweredInvIPPublic(userId, ip);
            }else {
                return mapper.selectQuestionsUnansweredInvIPPublic(userId, ip);
            }
        }else{
            if(answered)
            {
                return mapper.selectQuestionsAnsweredInvIPPrivate(userId, ip);
            }else {
                return mapper.selectQuestionsUnansweredInvIPPrivate(userId, ip);
            }
        }
    }

    @Override
    public List<Questions> selectQuestionConditionalInvisible(Integer userId, String condition) {
        if (condition == null || condition == "")
        {
            return selectQuestionsInv(userId);
        }
        if (condition.equals("answered"))
        {
            return selectQuestionsAnsweredInv(userId);
        }
        if (condition.equals("unanswered"))
        {
            return selectQuestionsUnansweredInv(userId);
        }
        return null;
    }

    @Override
    public List<Questions> searchQuestion(int userId, String searchContent, String condition) {
        if (condition == null || condition.equals(""))
        {
            return mapper.searchQuestion(userId, searchContent);
        }else if (condition.equals("answered"))
        {
            return mapper.searchQuestionAnswered(userId, searchContent);
        }else if (condition.equals("unanswered"))
        {
            return mapper.searchQuestionUnanswered(userId, searchContent);
        }
        return null;
    }

    @Override
    public int selectUser(String username) {
        return mapper.selectUser(username);
    }

    @Override
    public User selectUserInfo(int userId) {
        User user = mapper.selectUserInfo(userId);
        try {
            user.setPassword("");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }

    @Override
    public User selectUserDisplayInfo(int userId) {
        return mapper.selectUserDisplayInfo(userId);
    }

}
