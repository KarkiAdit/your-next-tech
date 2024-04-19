'use client';

import { useFormState } from 'react-dom';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';

export default function AdminCreateDelete(){
    const [formState, action] = useFormState(actions.createOrDeleteAdmin, {
        errors: {
            message: '',
            isAdmin: false
        }
    });
    return (
        <div>
            <form action={action}><FormButton>{formState.errors.isAdmin? "Add Admin": "Remove Admin"}</FormButton></form>
        </div>
    );
}