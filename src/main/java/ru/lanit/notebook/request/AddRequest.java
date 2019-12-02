package ru.lanit.notebook.request;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class AddRequest {

    @NotNull
    private String title;

    private String text;

    @NotNull @Max(2)
    private int priority;

    @NotNull
    private LocalDate date;

    @NotNull
    private boolean done;

    public String getTitle() {
        return title;
    }

    public AddRequest setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getText() {
        return text;
    }

    public AddRequest setText(String text) {
        this.text = text;
        return this;
    }

    public int getPriority() {
        return priority;
    }

    public AddRequest setPriority(int priority) {
        this.priority = priority;
        return this;
    }

    public LocalDate getDate() {
        return date;
    }

    public AddRequest setDate(LocalDate date) {
        this.date = date;
        return this;
    }

    public boolean isDone() {
        return done;
    }

    public AddRequest setDone(boolean done) {
        this.done = done;
        return this;
    }
}
