package org.echoq.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;
import java.util.Date;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel(value="Questions对象", description="")
public class Questions implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "questionId", type = IdType.AUTO)
    private Integer questionid;

    @TableField("anonyIp")
    private String anonyip;

    private String question;

    @TableField("userId")
    private Integer userid;

    private String response;

    private boolean visibility;

    private Date crtime;

    private Date updtime;
}
