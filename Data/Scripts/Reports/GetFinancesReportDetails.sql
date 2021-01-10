  SELECT 
  a.[PayDate] 'Date',
  t.[Name] 'Name',
  t.[Price] 'Value'
  FROM Appointments a
  JOIN Treatments t
		ON a.TreatmentId = t.TreatmentId
	LEFT JOIN Clients c
		ON c.ClientId = a.ClientId
  Where a.PayDate IS NOT NULL
  UNION ALL
    Select 
  pqc.[Date] 'Date',
  p.[Name] 'Name',
  p.[Price] * pqc.[QuantityChange] * (-1) 'Value'
  FROM ProductQuantityChanges pqc
	JOIN Products p
		ON p.ProductId = pqc.ProductId
  WHERE 
	pqc.IsPurchase = 1
	
