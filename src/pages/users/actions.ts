import {createUser} from "../../shared/api.ts";
import {startTransition} from "react";

type CreateActionState = { error?: string};

export const createUserAction = ({refetchUsers, setEmail}:{refetchUsers: () => void, setEmail: (email: string)=>void;}) =>async(prevState:CreateActionState, formData: {email: string}):Promise<CreateActionState> {
    try {

        await createUser({
        id: crypto.randomUUID(), 
          user: {
             email: formData.email,
            id: crypto.randomUUID(),
             },
    });
    startTransition(() => {
              refetchUsers();
               setEmail("");

    });
        return {

        }
    }
    catch(err) {
        return {

            error: 'Error creating user',
        }
    }
};
