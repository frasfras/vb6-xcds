# VB6-Style Inventory Management System Blueprint

## Project Overview
A classic Visual Basic 6 inventory management system with forms, controls, and database integration.

---

## Database Schema

### Tables

#### 1. Products
```sql
CREATE TABLE Products (
    ProductID INTEGER PRIMARY KEY AUTOINCREMENT,
    ProductCode VARCHAR(50) UNIQUE NOT NULL,
    ProductName VARCHAR(200) NOT NULL,
    Description TEXT,
    CategoryID INTEGER,
    UnitPrice DECIMAL(10,2) NOT NULL,
    QuantityInStock INTEGER DEFAULT 0,
    ReorderLevel INTEGER DEFAULT 10,
    SupplierID INTEGER,
    DateAdded DATETIME DEFAULT CURRENT_TIMESTAMP,
    LastModified DATETIME,
    IsActive BOOLEAN DEFAULT 1
)
```

#### 2. Categories
```sql
CREATE TABLE Categories (
    CategoryID INTEGER PRIMARY KEY AUTOINCREMENT,
    CategoryName VARCHAR(100) NOT NULL,
    Description TEXT
)
```

#### 3. Suppliers
```sql
CREATE TABLE Suppliers (
    SupplierID INTEGER PRIMARY KEY AUTOINCREMENT,
    SupplierName VARCHAR(200) NOT NULL,
    ContactPerson VARCHAR(100),
    Phone VARCHAR(20),
    Email VARCHAR(100),
    Address TEXT,
    City VARCHAR(100),
    Country VARCHAR(100)
)
```

#### 4. Transactions
```sql
CREATE TABLE Transactions (
    TransactionID INTEGER PRIMARY KEY AUTOINCREMENT,
    TransactionType VARCHAR(20) NOT NULL, -- 'IN' or 'OUT'
    ProductID INTEGER NOT NULL,
    Quantity INTEGER NOT NULL,
    UnitPrice DECIMAL(10,2),
    TotalAmount DECIMAL(10,2),
    TransactionDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Reference VARCHAR(100),
    Notes TEXT,
    UserID INTEGER
)
```

#### 5. Users
```sql
CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    FullName VARCHAR(100),
    Role VARCHAR(20), -- 'Admin', 'Manager', 'User'
    IsActive BOOLEAN DEFAULT 1
)
```

---

## Forms Structure

### 1. frmLogin (Login Form)
**Purpose:** User authentication

**Controls:**
- `txtUsername` (TextBox) - Username input
- `txtPassword` (TextBox) - Password input (PasswordChar = "*")
- `btnLogin` (Button) - Login button
- `btnCancel` (Button) - Cancel/Exit button
- `lblTitle` (Label) - "Inventory Management System"
- `lblUsername` (Label) - "Username:"
- `lblPassword` (Label) - "Password:"
- `picLogo` (PictureBox) - Company logo

**Event Handlers:**
```vb
Private Sub btnLogin_Click()
    ' Validate credentials against Users table
    ' If valid, open frmMain and hide frmLogin
    ' If invalid, show error message
    Dim sql As String
    sql = "SELECT * FROM Users WHERE Username='" & txtUsername.Text & "' AND IsActive=1"
    ' Execute query and validate password
    ' Set global CurrentUserID and CurrentUserRole
    frmMain.Show
    Me.Hide
End Sub

Private Sub btnCancel_Click()
    End
End Sub

Private Sub Form_Load()
    ' Center form on screen
    Me.Left = (Screen.Width - Me.Width) / 2
    Me.Top = (Screen.Height - Me.Height) / 2
End Sub
```

---

### 2. frmMain (Main Dashboard/MDI Form)
**Purpose:** Main application hub with menu and navigation

**Controls:**
- `mnuFile` (Menu) - File menu
  - `mnuFileExit` - Exit application
- `mnuInventory` (Menu) - Inventory menu
  - `mnuInventoryProducts` - Manage Products
  - `mnuInventoryCategories` - Manage Categories
  - `mnuInventorySuppliers` - Manage Suppliers
- `mnuTransactions` (Menu) - Transactions menu
  - `mnuTransStockIn` - Stock In
  - `mnuTransStockOut` - Stock Out
  - `mnuTransHistory` - Transaction History
- `mnuReports` (Menu) - Reports menu
  - `mnuReportsInventory` - Inventory Report
  - `mnuReportsLowStock` - Low Stock Alert
  - `mnuReportsSales` - Sales Report
- `mnuAdmin` (Menu) - Admin menu (visible only for Admin role)
  - `mnuAdminUsers` - Manage Users
- `StatusBar1` (StatusBar) - Show current user and date
- `lblWelcome` (Label) - Welcome message
- `Frame1` (Frame) - Quick stats frame
  - `lblTotalProducts` (Label) - Total products count
  - `lblLowStock` (Label) - Low stock items count
  - `lblTodayTransactions` (Label) - Today's transactions

**Event Handlers:**
```vb
Private Sub Form_Load()
    ' Set window state to maximized
    Me.WindowState = vbMaximized
    ' Load dashboard statistics
    LoadDashboardStats
    ' Set status bar
    StatusBar1.Panels(1).Text = "User: " & CurrentUserName
    StatusBar1.Panels(2).Text = "Date: " & Format(Date, "dd/mm/yyyy")
    ' Hide admin menu if not admin
    If CurrentUserRole <> "Admin" Then
        mnuAdmin.Visible = False
    End If
End Sub

Private Sub mnuInventoryProducts_Click()
    frmProducts.Show vbModal
End Sub

Private Sub mnuTransStockIn_Click()
    frmStockIn.Show vbModal
End Sub

Private Sub LoadDashboardStats()
    ' Query database for statistics
    lblTotalProducts.Caption = "Total Products: " & GetTotalProducts()
    lblLowStock.Caption = "Low Stock Items: " & GetLowStockCount()
    lblTodayTransactions.Caption = "Today's Transactions: " & GetTodayTransCount()
End Sub
```

---

### 3. frmProducts (Product Management Form)
**Purpose:** Add, edit, delete, and view products

**Controls:**
- `DataGrid1` (DataGrid/MSFlexGrid) - Display products list
- `txtProductCode` (TextBox) - Product code
- `txtProductName` (TextBox) - Product name
- `txtDescription` (TextBox) - Description (Multiline)
- `cboCategory` (ComboBox) - Category dropdown
- `cboSupplier` (ComboBox) - Supplier dropdown
- `txtUnitPrice` (TextBox) - Unit price
- `txtQuantity` (TextBox) - Quantity in stock
- `txtReorderLevel` (TextBox) - Reorder level
- `chkActive` (CheckBox) - Is Active
- `btnNew` (Button) - New product
- `btnSave` (Button) - Save product
- `btnEdit` (Button) - Edit selected
- `btnDelete` (Button) - Delete selected
- `btnRefresh` (Button) - Refresh grid
- `btnClose` (Button) - Close form
- `txtSearch` (TextBox) - Search box
- `btnSearch` (Button) - Search button
- `Frame1` (Frame) - Product Details frame

**Event Handlers:**
```vb
Private Sub Form_Load()
    ' Load categories into combo
    LoadCategories
    ' Load suppliers into combo
    LoadSuppliers
    ' Load products into grid
    LoadProducts
    ' Set initial state
    SetFormState "View"
End Sub

Private Sub btnNew_Click()
    ClearFields
    SetFormState "Add"
    txtProductCode.SetFocus
End Sub

Private Sub btnSave_Click()
    ' Validate inputs
    If Not ValidateInputs() Then Exit Sub
    
    ' Build SQL INSERT or UPDATE
    If FormMode = "Add" Then
        sql = "INSERT INTO Products (ProductCode, ProductName, Description, " & _
              "CategoryID, UnitPrice, QuantityInStock, ReorderLevel, SupplierID) " & _
              "VALUES ('" & txtProductCode.Text & "', '" & txtProductName.Text & "', " & _
              "'" & txtDescription.Text & "', " & cboCategory.ItemData(cboCategory.ListIndex) & ", " & _
              txtUnitPrice.Text & ", " & txtQuantity.Text & ", " & txtReorderLevel.Text & ", " & _
              cboSupplier.ItemData(cboSupplier.ListIndex) & ")"
    Else
        sql = "UPDATE Products SET ProductCode='" & txtProductCode.Text & "', " & _
              "ProductName='" & txtProductName.Text & "', " & _
              "Description='" & txtDescription.Text & "', " & _
              "CategoryID=" & cboCategory.ItemData(cboCategory.ListIndex) & ", " & _
              "UnitPrice=" & txtUnitPrice.Text & ", " & _
              "QuantityInStock=" & txtQuantity.Text & ", " & _
              "ReorderLevel=" & txtReorderLevel.Text & ", " & _
              "SupplierID=" & cboSupplier.ItemData(cboSupplier.ListIndex) & ", " & _
              "LastModified='" & Now & "' " & _
              "WHERE ProductID=" & CurrentProductID
    End If
    
    ' Execute query
    ExecuteSQL sql
    MsgBox "Product saved successfully!", vbInformation
    LoadProducts
    SetFormState "View"
End Sub

Private Sub btnEdit_Click()
    If DataGrid1.Row < 1 Then
        MsgBox "Please select a product to edit", vbExclamation
        Exit Sub
    End If
    LoadProductDetails DataGrid1.TextMatrix(DataGrid1.Row, 0)
    SetFormState "Edit"
End Sub

Private Sub btnDelete_Click()
    If DataGrid1.Row < 1 Then Exit Sub
    If MsgBox("Delete this product?", vbYesNo + vbQuestion) = vbYes Then
        sql = "DELETE FROM Products WHERE ProductID=" & DataGrid1.TextMatrix(DataGrid1.Row, 0)
        ExecuteSQL sql
        LoadProducts
    End If
End Sub

Private Sub btnSearch_Click()
    sql = "SELECT * FROM Products WHERE ProductName LIKE '%" & txtSearch.Text & "%' " & _
          "OR ProductCode LIKE '%" & txtSearch.Text & "%'"
    LoadProductsWithSQL sql
End Sub

Private Sub DataGrid1_Click()
    ' Load selected product details
    If DataGrid1.Row > 0 Then
        LoadProductDetails DataGrid1.TextMatrix(DataGrid1.Row, 0)
    End If
End Sub
```

---

### 4. frmStockIn (Stock In Transaction Form)
**Purpose:** Record incoming stock

**Controls:**
- `cboProduct` (ComboBox) - Product selection
- `txtQuantity` (TextBox) - Quantity to add
- `txtUnitPrice` (TextBox) - Unit price
- `txtTotalAmount` (TextBox) - Total amount (calculated)
- `txtReference` (TextBox) - Reference number
- `txtNotes` (TextBox) - Notes (Multiline)
- `dtpDate` (DateTimePicker) - Transaction date
- `btnAdd` (Button) - Add to transaction
- `btnSave` (Button) - Save transaction
- `btnCancel` (Button) - Cancel
- `DataGrid1` (DataGrid) - Transaction items list
- `lblGrandTotal` (Label) - Grand total

**Event Handlers:**
```vb
Private Sub Form_Load()
    LoadProducts
    dtpDate.Value = Date
    InitializeGrid
End Sub

Private Sub txtQuantity_Change()
    CalculateTotal
End Sub

Private Sub txtUnitPrice_Change()
    CalculateTotal
End Sub

Private Sub CalculateTotal()
    If IsNumeric(txtQuantity.Text) And IsNumeric(txtUnitPrice.Text) Then
        txtTotalAmount.Text = CDbl(txtQuantity.Text) * CDbl(txtUnitPrice.Text)
    End If
End Sub

Private Sub btnAdd_Click()
    ' Validate inputs
    If cboProduct.ListIndex = -1 Then
        MsgBox "Please select a product", vbExclamation
        Exit Sub
    End If
    
    ' Add to grid
    With DataGrid1
        .Rows = .Rows + 1
        .TextMatrix(.Rows - 1, 0) = cboProduct.ItemData(cboProduct.ListIndex)
        .TextMatrix(.Rows - 1, 1) = cboProduct.Text
        .TextMatrix(.Rows - 1, 2) = txtQuantity.Text
        .TextMatrix(.Rows - 1, 3) = txtUnitPrice.Text
        .TextMatrix(.Rows - 1, 4) = txtTotalAmount.Text
    End With
    
    ' Update grand total
    UpdateGrandTotal
    ClearItemFields
End Sub

Private Sub btnSave_Click()
    If DataGrid1.Rows < 2 Then
        MsgBox "Please add at least one item", vbExclamation
        Exit Sub
    End If
    
    ' Save each transaction
    For i = 1 To DataGrid1.Rows - 1
        sql = "INSERT INTO Transactions (TransactionType, ProductID, Quantity, " & _
              "UnitPrice, TotalAmount, TransactionDate, Reference, Notes, UserID) " & _
              "VALUES ('IN', " & DataGrid1.TextMatrix(i, 0) & ", " & _
              DataGrid1.TextMatrix(i, 2) & ", " & DataGrid1.TextMatrix(i, 3) & ", " & _
              DataGrid1.TextMatrix(i, 4) & ", '" & Format(dtpDate.Value, "yyyy-mm-dd") & "', " & _
              "'" & txtReference.Text & "', '" & txtNotes.Text & "', " & CurrentUserID & ")"
        ExecuteSQL sql
        
        ' Update product quantity
        sql = "UPDATE Products SET QuantityInStock = QuantityInStock + " & _
              DataGrid1.TextMatrix(i, 2) & " WHERE ProductID=" & DataGrid1.TextMatrix(i, 0)
        ExecuteSQL sql
    Next i
    
    MsgBox "Stock in transaction saved successfully!", vbInformation
    Unload Me
End Sub
```

---

### 5. frmStockOut (Stock Out Transaction Form)
**Purpose:** Record outgoing stock (sales/usage)

**Controls:** (Similar to frmStockIn)
- Same layout as Stock In form
- Additional: `cboCustomer` (ComboBox) - Customer selection (optional)

**Event Handlers:**
```vb
' Similar to frmStockIn but:
' - TransactionType = 'OUT'
' - Subtract from QuantityInStock instead of adding
' - Validate sufficient stock before allowing transaction

Private Sub btnAdd_Click()
    ' Check if sufficient stock available
    Dim availableStock As Integer
    availableStock = GetProductStock(cboProduct.ItemData(cboProduct.ListIndex))
    
    If CInt(txtQuantity.Text) > availableStock Then
        MsgBox "Insufficient stock! Available: " & availableStock, vbExclamation
        Exit Sub
    End If
    
    ' Rest of the code similar to Stock In
    ' ...
End Sub
```

---

### 6. frmReports (Reports Form)
**Purpose:** Generate and view various reports

**Controls:**
- `TabStrip1` (TabStrip) or `SSTab1` (SSTab) - Multiple report tabs
  - Tab 1: Inventory Report
  - Tab 2: Low Stock Alert
  - Tab 3: Transaction History
  - Tab 4: Sales Summary
- `DataGrid1` (DataGrid) - Report data display
- `dtpFrom` (DateTimePicker) - From date
- `dtpTo` (DateTimePicker) - To date
- `btnGenerate` (Button) - Generate report
- `btnExport` (Button) - Export to Excel/CSV
- `btnPrint` (Button) - Print report
- `cboReportType` (ComboBox) - Report type selector

**Event Handlers:**
```vb
Private Sub btnGenerate_Click()
    Select Case TabStrip1.SelectedItem.Index
        Case 1 ' Inventory Report
            sql = "SELECT p.ProductCode, p.ProductName, c.CategoryName, " & _
                  "p.QuantityInStock, p.UnitPrice, " & _
                  "(p.QuantityInStock * p.UnitPrice) AS TotalValue " & _
                  "FROM Products p " & _
                  "LEFT JOIN Categories c ON p.CategoryID = c.CategoryID " & _
                  "WHERE p.IsActive = 1 " & _
                  "ORDER BY p.ProductName"
                  
        Case 2 ' Low Stock Alert
            sql = "SELECT ProductCode, ProductName, QuantityInStock, ReorderLevel " & _
                  "FROM Products " & _
                  "WHERE QuantityInStock <= ReorderLevel AND IsActive = 1 " & _
                  "ORDER BY QuantityInStock"
                  
        Case 3 ' Transaction History
            sql = "SELECT t.TransactionDate, t.TransactionType, p.ProductName, " & _
                  "t.Quantity, t.UnitPrice, t.TotalAmount, t.Reference " & _
                  "FROM Transactions t " & _
                  "INNER JOIN Products p ON t.ProductID = p.ProductID " & _
                  "WHERE t.TransactionDate BETWEEN '" & Format(dtpFrom.Value, "yyyy-mm-dd") & "' " & _
                  "AND '" & Format(dtpTo.Value, "yyyy-mm-dd") & "' " & _
                  "ORDER BY t.TransactionDate DESC"
    End Select
    
    LoadReportData sql
End Sub

Private Sub btnExport_Click()
    ' Export DataGrid to CSV
    ExportToCSV DataGrid1, "Report_" & Format(Now, "yyyymmdd_hhnnss") & ".csv"
End Sub

Private Sub btnPrint_Click()
    ' Print report using Crystal Reports or DataReport
    PrintReport
End Sub
```

---

### 7. frmCategories (Category Management Form)
**Purpose:** Manage product categories

**Controls:**
- `ListView1` (ListView) - Categories list
- `txtCategoryName` (TextBox) - Category name
- `txtDescription` (TextBox) - Description
- `btnAdd` (Button) - Add category
- `btnEdit` (Button) - Edit category
- `btnDelete` (Button) - Delete category
- `btnClose` (Button) - Close form

**Event Handlers:**
```vb
Private Sub btnAdd_Click()
    If Trim(txtCategoryName.Text) = "" Then
        MsgBox "Please enter category name", vbExclamation
        Exit Sub
    End If
    
    sql = "INSERT INTO Categories (CategoryName, Description) " & _
          "VALUES ('" & txtCategoryName.Text & "', '" & txtDescription.Text & "')"
    ExecuteSQL sql
    MsgBox "Category added successfully!", vbInformation
    LoadCategories
    ClearFields
End Sub
```

---

### 8. frmSuppliers (Supplier Management Form)
**Purpose:** Manage suppliers

**Controls:**
- `DataGrid1` (DataGrid) - Suppliers list
- `txtSupplierName` (TextBox)
- `txtContactPerson` (TextBox)
- `txtPhone` (TextBox)
- `txtEmail` (TextBox)
- `txtAddress` (TextBox) - Multiline
- `txtCity` (TextBox)
- `txtCountry` (TextBox)
- `btnNew`, `btnSave`, `btnEdit`, `btnDelete`, `btnClose` (Buttons)

**Event Handlers:** (Similar pattern to frmProducts)

---

### 9. frmUsers (User Management Form - Admin Only)
**Purpose:** Manage system users

**Controls:**
- `DataGrid1` (DataGrid) - Users list
- `txtUsername` (TextBox)
- `txtPassword` (TextBox)
- `txtFullName` (TextBox)
- `cboRole` (ComboBox) - Admin, Manager, User
- `chkActive` (CheckBox) - Is Active
- `btnAdd`, `btnEdit`, `btnDelete`, `btnClose` (Buttons)

**Event Handlers:**
```vb
Private Sub btnAdd_Click()
    ' Hash password before storing
    Dim hashedPassword As String
    hashedPassword = MD5Hash(txtPassword.Text)
    
    sql = "INSERT INTO Users (Username, Password, FullName, Role, IsActive) " & _
          "VALUES ('" & txtUsername.Text & "', '" & hashedPassword & "', " & _
          "'" & txtFullName.Text & "', '" & cboRole.Text & "', " & _
          IIf(chkActive.Value = 1, 1, 0) & ")"
    ExecuteSQL sql
    MsgBox "User added successfully!", vbInformation
    LoadUsers
End Sub
```

---

## Common Modules

### modDatabase.bas
```vb
' Database connection and operations
Public cn As ADODB.Connection
Public rs As ADODB.Recordset

Public Sub ConnectDatabase()
    Set cn = New ADODB.Connection
    cn.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & App.Path & "\inventory.mdb"
    cn.Open
End Sub

Public Function ExecuteSQL(sql As String) As Boolean
    On Error GoTo ErrHandler
    cn.Execute sql
    ExecuteSQL = True
    Exit Function
ErrHandler:
    MsgBox "Database Error: " & Err.Description, vbCritical
    ExecuteSQL = False
End Function

Public Function GetRecordset(sql As String) As ADODB.Recordset
    Set rs = New ADODB.Recordset
    rs.Open sql, cn, adOpenStatic, adLockReadOnly
    Set GetRecordset = rs
End Function
```

### modGlobal.bas
```vb
' Global variables and constants
Public CurrentUserID As Integer
Public CurrentUserName As String
Public CurrentUserRole As String

Public Const APP_TITLE = "Inventory Management System v1.0"
```

### modUtilities.bas
```vb
' Utility functions
Public Function ValidateNumber(txt As TextBox) As Boolean
    If Not IsNumeric(txt.Text) Then
        MsgBox "Please enter a valid number", vbExclamation
        txt.SetFocus
        ValidateNumber = False
    Else
        ValidateNumber = True
    End If
End Function

Public Function MD5Hash(strInput As String) As String
    ' MD5 hashing implementation
    ' (Use external library or API)
End Function

Public Sub ExportToCSV(grid As MSFlexGrid, filename As String)
    ' Export grid data to CSV file
    Dim i As Integer, j As Integer
    Dim fileNum As Integer
    fileNum = FreeFile
    
    Open filename For Output As #fileNum
    
    For i = 0 To grid.Rows - 1
        For j = 0 To grid.Cols - 1
            Print #fileNum, grid.TextMatrix(i, j);
            If j < grid.Cols - 1 Then Print #fileNum, ",";
        Next j
        Print #fileNum, ""
    Next i
    
    Close #fileNum
    MsgBox "Exported successfully to " & filename, vbInformation
End Sub
```

---

## Key Features Summary

1. **User Authentication** - Role-based access control
2. **Product Management** - CRUD operations for products
3. **Inventory Tracking** - Real-time stock levels
4. **Transaction Management** - Stock in/out with history
5. **Reporting** - Multiple report types with export
6. **Low Stock Alerts** - Automatic reorder level monitoring
7. **Supplier Management** - Track supplier information
8. **Category Management** - Organize products by category
9. **User Management** - Admin can manage system users
10. **Dashboard** - Quick overview of key metrics

---

## Deployment Notes

**Required Components:**
- Visual Basic 6.0 Runtime
- Microsoft Jet Database Engine (Access)
- MDAC (Microsoft Data Access Components)
- Crystal Reports (optional, for advanced reporting)

**Database File:** inventory.mdb (Microsoft Access format)

**Installation:**
1. Install VB6 runtime on client machines
2. Copy application EXE and database file
3. Create desktop shortcut
4. Default admin login: admin/admin123

---

This blueprint provides a complete VB6-style inventory management system with all essential forms, controls, event handlers, and database structure!
