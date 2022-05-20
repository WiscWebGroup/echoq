package org.echoq.util;

public class Result<T> {
    T t;
    int messageCode;

    public Result() {
    }

    public Result(T t, int messageCode) {
        this.t = t;
        this.messageCode = messageCode;
    }

    @Override
    public String toString() {
        return "Result{" +
                "t=" + t +
                ", messageCode=" + messageCode +
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
}
