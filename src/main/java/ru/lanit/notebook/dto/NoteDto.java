package ru.lanit.notebook.dto;

import java.time.LocalDate;

public class NoteDto {

    private long id;
    private String title;
    private String text;
    private int priority;
    private LocalDate date;
    private boolean done;

    public NoteDto(long id, String title, String text, int priority, LocalDate date, boolean done) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.priority = priority;
        this.date = date;
        this.done = done;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public int getPriority() {
        return priority;
    }

    public LocalDate getDate() {
        return date;
    }

    public boolean isDone() {
        return done;
    }

    public String getText() {
        return text;
    }
}
