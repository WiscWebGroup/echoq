package org.echoq.util;

import lombok.Data;

@Data
public class ResultToken<T> {
    T t;
    int messageCode;
    String token;

    public ResultToken() {
    }

    public ResultToken(T t, int messageCode, String token) {
        this.t = t;
        this.messageCode = messageCode;
        this.token = token;
    }

    @Override
    public String toString() {
        return "ResultToken{" +
                "t=" + t +
                ", messageCode=" + messageCode +
                ", token='" + token + '\'' +
                '}';
    }

    public T getT() {
        return t;
    }

    public void setT(T t) {
        this.t = t;
    }

    public int getMessageCode() {
        return messageCode;
    }

    public void setMessageCode(int messageCode) {
        this.messageCode = messageCode;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
