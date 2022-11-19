using simply_flashcards_backend.BusinessLogic;
using simply_flashcards_backend.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => {
        policy
            .WithOrigins(builder.Configuration.GetValue<string>("Origins").Split(','))
            .AllowAnyHeader();
    });
});

// Add services to the container.
builder.Services.AddSingleton<IDecksBLL, DecksBLL>();
builder.Services.AddSingleton<ICardsBLL, CardsBLL>();

builder.Services.AddSingleton<IDecksRepository, MemDecksRepository>();
builder.Services.AddSingleton<ICardsRepository, MemCardsRepository>();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();
app.MapControllers();

app.Run();
