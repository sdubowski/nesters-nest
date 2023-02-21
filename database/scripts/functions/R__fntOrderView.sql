IF EXISTS (SELECT * FROM sysobjects WHERE id = object_id('fntOrderView') AND xtype IN ('FN', 'IF', 'TF'))
	DROP FUNCTION dbo.fntOrderView
GO

CREATE FUNCTION [dbo].fntOrderView (@userId varchar(36))
RETURNS TABLE                     
AS                    
RETURN(

SELECT 
	o.Id,
	os.Description as OrderStatus,
	o.CreationDate,
	o.EndDate,
	driver.FirstName + ' ' + driver.LastName as DriverName,
	forwarder.FirstName + ' ' + forwarder.LastName as UserName,
	o.CargoType,
	o.Mileage

	FROM [dbo].[Order] o
	JOIN [dict].[OrderStatus] os on o.OrderStatusId = os.Id

	outer apply (
	select u.FirstName, u.LastName from dbo.[Users] u
	join dbo.AspNetUserRoles ur on u.Id = ur.UserId
	where u.Id = o.DriverId and ur.RoleId = 1
	) driver

	outer apply (
	select u.FirstName, u.LastName from dbo.[Users] u
	join dbo.AspNetUserRoles ur on u.Id = ur.UserId
	where u.Id = o.UserId and ur.RoleId = 2
	) forwarder

	outer apply (
	select u.Id, ur.RoleId, u.CompanyId from dbo.Users u
	join dbo.AspNetUserRoles ur on ur.UserId = u.Id
	where u.Id = @userId
	) appUser

	where o.CompanyId = appUser.CompanyId and o.OrderTypeId = 1 and
	case 
		when appUser.RoleId = 1 then o.DriverId
		when appUser.RoleId = 2 then o.UserId
	end = @userId
)

GO
