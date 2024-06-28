using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();


app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5273/categoria/listar
app.MapGet("/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5273/categoria/cadastrar
app.MapPost("/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5273/tarefas/listar
app.MapGet("/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5273/tarefas/cadastrar
app.MapPost("/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

  PUT: http://localhost:5273/tarefas/alterar/{id}
 app.MapPut("/tarefas/alterar/{id}", ([FromRoute] string id,
    [FromBody] Tarefa produtoAlterado,
    [FromServices] AppDataContext ctx) =>
{
    Tarefa? tarefa = ctx.Tarefas.Find(id);
    if (tarefa is null)
    {
        return Results.
            NotFound("Produto não encontrado!");
    }   
    tarefa.TarefaId= produtoAlterado.TarefaId;
    tarefa.Titulo = tarefaAlterado.Titulo;
    tarefa.Descricao = produtoAlterado.Descricao;
    tarefa.Categoria = produtoAlterado.Categoria;
    tarefa.CategoriaId = produtoAlterado.CategoriaId;

    ctx.Tarefas.Update(tarefa);
    ctx.SaveChanges();
    return Results.
        Ok("Produto alterado com sucesso!");
});

//GET: http://localhost:5273/tarefas/naoconcluidas
app.MapGet("/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    //Implementar a listagem de tarefas não concluídas
});

//GET: http://localhost:5273/tarefas/concluidas
app.MapGet("/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    //Implementar a listagem de tarefas concluídas
});

app.UseCors("Acesso Total");
app.Run();
