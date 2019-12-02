package ru.lanit.notebook.request;

import javax.validation.constraints.NotNull;

public class DeleteRequest {
    @NotNull
    private long id;

    public long getId() {
        return id;
    }

    public DeleteRequest setId(long id) {
        this.id = id;
        return this;
    }
}
