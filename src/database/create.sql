create table [users] (
	[id] int not null identity(1,1) primary key,
	[email] varchar(320) unique,
	[login] varchar(128) not null,
	[password] varchar(32) not null,
);

insert into [users]([email], [login], [password])
values('nov.konstantin@gmail.com', 'admin', 'password');

select * from users;

create table [tokens] (
	[guid] uniqueidentifier not null default newid() primary key,
	[active] bit not null default 0,
	[created] datetime2 not null default getdate(),
	[updated] datetime2 not null default getdate(),
	[expires] datetime2 default null,
	[userId] int default null
);

declare @InOneYear datetime2;
set @InOneYear = dateadd(day, 365, getdate());

insert into [tokens] ([active], [expires], [userId])
values(1, @inOneYear, 1);

select * from tokens;






