package org.echoq.service;

import org.echoq.entity.Questions;
import org.echoq.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;

import java.io.File;
import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author HaroldCI
 * @since 2022-05-20
 */
public interface IUserService extends IService<User> {
    int selectUsername(String username);
    int insertUser(String username, String password);
    int signin(String username, String password);
    int updateUserInfo(User user);
    int updateAvatar(File file);
    int respondQuestion(Questions question);
    int updateVisibility(boolean visibility, int questionId);
    int deleteUser(int userId);
    int deleteQuestion(int questionId);
    List<Questions> selectQuestions(int userId);
    List<Questions> searchQuestion(String searchContent);
    int selectUser(String username);
    User selectUserInfo(int userId);
    List<Questions> selectQuestionsUnanswered(int userId);
    List<Questions> selectQuestionsAnswered(int userId);
    List<Questions> selectQuestionConditional(int userId, String condition);

    List<Questions> selectQuestionsInv(int userId);
    List<Questions> selectQuestionsUnansweredInv(int userId);
    List<Questions> selectQuestionsAnsweredInv(int userId);

    List<Questions> selectQuestionConditionalInvisible(int userId, String condition);
}
