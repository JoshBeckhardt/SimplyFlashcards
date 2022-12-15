using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using simply_flashcards_backend.BusinessLogic;
using simply_flashcards_backend.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => {
        policy
            .WithOrigins(builder.Configuration.GetValue<string>("Origins").Split(','))
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Add services to the container.
builder.Services.AddSingleton<IDecksBLL, DecksBLL>();
builder.Services.AddSingleton<ICardsBLL, CardsBLL>();
builder.Services.AddSingleton<IUsersBLL, UsersBLL>();

builder.Services.AddSingleton<IDecksRepository, DecksRepository>();
builder.Services.AddSingleton<ICardsRepository, CardsRepository>();
builder.Services.AddSingleton<IUsersRepository, UsersRepository>();

builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters() {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                builder.Configuration.GetValue<string>("JwtSecretKey")
            )),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // Powershell command to publish for production:
    // dotnet publish /p:EnvironmentName=Production -o production-build

    app.UseHttpsRedirection();
}

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
