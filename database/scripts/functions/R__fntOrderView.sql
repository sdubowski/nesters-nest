IF EXISTS (SELECT * FROM sysobjects WHERE id = object_id('fntOrderView') AND xtype IN ('FN', 'IF', 'TF'))
	DROP FUNCTION dbo.fntOrderView
GO

CREATE FUNCTION [dbo].fntOrderView (@companyId varchar(32), @userId varchar(36), @orderTypeId int)
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

	where o.CompanyId = @companyId and o.OrderTypeId = @orderTypeId
)

GO
