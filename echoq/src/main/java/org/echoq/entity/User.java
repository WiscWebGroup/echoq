package org.echoq.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author HaroldCI
 * @since 2022-05-20
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "userId", type = IdType.AUTO)
    private Integer userid;

    @TableField("userName")
    private String username;

    private String name;

    private String email;

    private String password;

    @TableField("avatarAddr")
    private String avataraddr;

    private String whatsup;

    private String color;

    @Override
    public String toString() {
        return "User{" +
                "userid=" + userid +
                ", username='" + username + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", avataraddr='" + avataraddr + '\'' +
                ", whatsup='" + whatsup + '\'' +
                ", color='" + color + '\'' +
                '}';
    }
}
