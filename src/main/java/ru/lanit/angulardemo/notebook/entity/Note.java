package ru.lanit.angulardemo.notebook.entity;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "notes")
public class Note {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    private String title;
    private String text;
    private int priority;
    private LocalDate date;

    public Note() {
    }

    public Note(String title, String text, int priority, LocalDate date) {
        this.title = title;
        this.text = text;
        this.priority = priority;
        this.date = date;
    }

    public long getId() {
        return id;
    }

    public Note setId(long id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public Note setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getText() {
        return text;
    }

    public Note setText(String text) {
        this.text = text;
        return this;
    }

    public int getPriority() {
        return priority;
    }

    public Note setPriority(int priority) {
        this.priority = priority;
        return this;
    }

    public LocalDate getDate() {
        return date;
    }

    public Note setDate(LocalDate date) {
        this.date = date;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Note note = (Note) o;
        return id == note.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
