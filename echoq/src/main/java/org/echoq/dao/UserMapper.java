package org.echoq.dao;

import org.apache.ibatis.annotations.Mapper;
import org.echoq.entity.Questions;
import org.echoq.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author HaroldCI
 * @since 2022-05-20
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {
    int selectUsername(String username);
    int insertUser(User user);
    int insertUserWithName(User user);
    int updateUserInfo(User user);
    int updateUserName(User user);
    int updateUserPassword(User user);
    int updateUserWhatsup(User user);
    int updateAvatar(String avatar, int userId);
    int respondQuestion(Questions question);
    int updateVisibility(boolean visibility, int questionId);
    int deleteUser(int userId);
    int confirmQuestionBelonging(int questionId);
    int deleteQuestion(int questionId);
    List<Questions> searchQuestion(Integer userId, String searchContent);
    List<Questions> searchQuestionAnswered(Integer userId, String searchContent);
    List<Questions> searchQuestionUnanswered(Integer userId, String searchContent);

    List<Questions> searchQuestionUser(Integer userId, String searchContent, String ip);
    List<Questions> searchQuestionAnsweredUser(Integer userId, String searchContent, String ip);
    List<Questions> searchQuestionUnansweredUser(Integer userId, String searchContent, String ip);

    int selectUser(String username);
    User selectUserInfo(int userId);
    User selectUserDisplayInfo(int userId);

    List<Questions> selectQuestions(int userId);
    List<Questions> selectQuestionsUnanswered(int userId);
    List<Questions> selectQuestionsAnswered(int userId);

    List<Questions> selectQuestionsInv(int userId);
    List<Questions> selectQuestionsUnansweredInv(int userId);
    List<Questions> selectQuestionsAnsweredInv(int userId);

    List<Questions> selectQuestionsVisIP(int userId, String ip);
    List<Questions> selectQuestionsUnansweredVisIP(int userId, String ip);
    List<Questions> selectQuestionsAnsweredVisIP(int userId, String ip);

    List<Questions> selectQuestionsUnansweredInvIPPublic(int userId, String ip);
    List<Questions> selectQuestionsAnsweredInvIPPublic(int userId, String ip);
    List<Questions> selectQuestionsUnansweredInvIPPrivate(int userId, String ip);
    List<Questions> selectQuestionsAnsweredInvIPPrivate(int userId, String ip);

    int signin(String username, String password);
}
