package ru.lanit.notebook.request;

import javax.validation.constraints.NotEmpty;

public class DeleteRequest {

    @NotEmpty
    private long id;

    public long getId() {
        return id;
    }

    public DeleteRequest setId(long id) {
        this.id = id;
        return this;
    }
}
