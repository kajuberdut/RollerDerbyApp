from fastapi import APIRouter, Depends, HTTPException, Response
from starlette.responses import FileResponse 
from ..dependencies import get_and_validate_current_user, get_db

import os
from os import path

from ..crud.group_crud import *
from ..crud.insurance_crud import *

import xlsxwriter


router = APIRouter(
    prefix="/teams",
    tags=["teams"],
    dependencies=[Depends(get_and_validate_current_user)],
)

# * get /teams/{team_id}/form/{admin_id}
# * get invites by user_id

@router.get("/{group_id}/form/{admin_id}")
def get_team_form_by_admin_id_team_id(admin_id: int, group_id: int,  db: Session = Depends(get_db)):
    print("hitting /teams/{team_id}/form/{admin_id}")
        
    participants = crud_get_participant_usernames_by_group_id(db, group_id=group_id)
    group = crud_get_group_by_group_id(db, group_id=group_id)
    
    if group.admin != admin_id: 
        raise HTTPException(status_code=401, detail="Unauthorized")
        
        
    # ! note need absolute path here.
    
    file_name = f"{group.name}.xlsx"
    file_path = os.path.join('/home/kicamsmm/Springboard_Recent/Springboard/Capstone2/api/src/static', file_name)
    
    workbook = xlsxwriter.Workbook(file_path)
    worksheet = workbook.add_worksheet()
    
    # set height of row (row 0, height 30 )
    worksheet.set_row(0, 30) 
    worksheet.set_row(1, 20) 

    
    title_format = workbook.add_format(
        {
            "bold": 1,
            "border": 1,
            "align": "center",
            "valign": "vcenter",
            "fg_color": "#d3d3d3",
            "font_size": 16
        }
    )
    
    worksheet.merge_range('A1:H1', f"{group.name}", title_format)
    
    worksheet.set_column('A:A', 30)  
    worksheet.set_column('B:B', 20)
    worksheet.set_column('C:C', 20)
    worksheet.set_column('D:D', 50)
    worksheet.set_column('E:E', 30)
    worksheet.set_column('F:F', 30)
    worksheet.set_column('G:G', 30)
    worksheet.set_column('H:H', 30)    

    # Write some numbers, with row/column notation.
    skate_fields_format = workbook.add_format(
        {
            "bold": 1,
            "border": 1,
            "align": "center",
            "valign": "vcenter",
            "fg_color": "#d3d3d3",
            "font_size": 14
        }
    )
    
    worksheet.write('A2', 'Skater Name', skate_fields_format)
    worksheet.write('B2', 'Number', skate_fields_format)
    worksheet.write('C2', 'Alt Number', skate_fields_format)
    worksheet.write('D2', 'Additional Information', skate_fields_format)
    worksheet.write('E2', 'Insurance', skate_fields_format)
    worksheet.write('F2', 'Legal Name', skate_fields_format)
    worksheet.write('G2', 'Phone #', skate_fields_format)
    worksheet.write('H2', 'Email', skate_fields_format)

    row_index = 2
    
    
    for participant in participants: 
        details = crud_get_user_details_by_username(db, username=participant)
        
        center_format = workbook.add_format({'align': 'center'})

        worksheet.write(row_index, 0, details.username)
        worksheet.write(row_index, 1, details.primary_number, center_format)
        worksheet.write(row_index, 2, details.secondary_number, center_format)
        worksheet.write(row_index, 3, details.additional_info)
        
        insurance_strings = []
        
        for eachInsurance in details.insurance: 
            ins = crud_get_insurance_by_id(db, insurance_id=eachInsurance.insurance_id)
            insurance_strings.append(f"{ins.type}: {eachInsurance.insurance_number}")
            
        formatted_insurance = ", ".join(insurance_strings)      
        
        worksheet.write(row_index, 4, formatted_insurance)
        
        if details.first_name and details.last_name:   
            legal_name = f"{details.first_name} {details.last_name}"
            worksheet.write(row_index, 5, legal_name) 
            
        if details.phone_number:
            formatted_number = f"({details.phone_number[:3]}) {details.phone_number[3:6]}-{details.phone_number[6:10]}" 
            worksheet.write(row_index, 6, formatted_number)
            
        worksheet.write(row_index, 7, details.email)
        
        row_index += 1
    
    workbook.close()
    
    file_url = f"http://localhost:8000/static/{file_name}"
    
    # file_url = f"api/src/static/demo.xlsx"
    # file_url = f"/home/kicamsmm/Springboard_Recent/Springboard/Capstone2/api/src/static/demo.xlsx"
    
    return {"url": file_url}
