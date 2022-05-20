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
    int updateUserInfo(User user);
    int updateAvatar(String s);
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
}
