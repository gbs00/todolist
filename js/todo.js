$(function () {
    $("#add").on("keydown", function (event) {
        if (event.keyCode == 13) {
            if ($(this).val() == "") {
                alert ("Text here!");
            } else {
                var data = get();
                data.push({
                    title: $(this).val(),
                    done: false
                });
                set(data);
                load();
                $(this).val("");
            }
        }
    })

    load();

    function get() {
        var data = localStorage.getItem("todolist");
        if (data == null) {
            return[];
        } else {
            return JSON.parse(data);
        }
    }

    function set(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    function load() {
        var todo = 0;
        var done = 0;
        var data = get();
        $("ol,ul").empty();
        $.each(data, function (i, n) {
            if (n.done) {
                var li = $("<li><input type='checkbox' checked='checked'><span>" + n.title + "</span><a href='javascript:;' id=" + i + "></a></li>");
                $("ul").prepend(li);
                done++;
            } else {
                var li = $("<li><input type='checkbox'><span>" + n.title + "</span><a href='javascript:;' id=" + i + "></a></li>");
                $("ol").prepend(li);
                todo++;
            }
        })
        $("#todocount").text(todo);
        $("#donecount").text(done);
    }

    $("ol,ul").on("click", "a", function () {
        var data = get();
        var index = $(this).attr("id");
        data.splice(index, 1);
        set(data);
        load();
    })

    $("ol,ul").on("click", "input", function () {
        var data = get();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        set(data);
        load();
    })

    $("#clear").on('click', function () {
        localStorage.clear();
        load();
    })
})