select * 
from alluser a
join food f on f.Userref = a.id
--join exercise e on e.Userref = a.id
--join meditation m on m.Userref = a.id
--join journal j on j.Userref = a.id
--join expenses ex on ex.Userref = a.id
--join habits h on h.Userref = a.id
--where a.id = 1

delete from journal where userref = 2 
delete from food where userref = 2 and date > '2024-01-10'
delete from expenses where userref = 2 
delete from exercise where userref = 2

select * from journal
select * from expenses
select * from food
select * from exercise

SELECT 
            f.id,
            f.userref,
            f.foodname,
            f.calories,
            f.notes,
            (f.date - interval '8 hours') as datetime 
          FROM 
            Food f 