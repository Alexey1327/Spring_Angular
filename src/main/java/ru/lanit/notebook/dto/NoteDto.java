package ru.lanit.notebook.dto;

import java.time.LocalDate;

public class NoteDto {

    private long id;
    private String title;
    private int priority;
    private LocalDate date;

    public NoteDto(long id, String title, int priority, LocalDate date) {
        this.id = id;
        this.title = title;
        this.priority = priority;
        this.date = date;
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
}
