import React from "react";
import {Button, Input} from "../index";
import './modal_window.scss'

type working = {
    title: string
    description: string
    link: string
}

interface IWorking {
    title: string
    description: string
    link: string
    id: number
}

interface IProps {
    isUpdateAndAdd: {type: boolean, id: number | null}
    working: IWorking[]
    setShowModal: (pre: boolean) => void
}

const ModalWindow: React.FC<IProps> = ({isUpdateAndAdd, working, setShowModal}) => {
    const [form, setForm] = React.useState<working>({
        title: '',
        description: '',
        link: ''
    })
    const [animation, setAnimation] = React.useState<boolean>(false)

    const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    React.useEffect(() => {
        setAnimation(true)
        if (isUpdateAndAdd.type) {
            for (let iWorking of working) {
                if (isUpdateAndAdd.id == iWorking.id) {
                    setForm({
                        title: iWorking.title,
                        description: iWorking.description,
                        link: iWorking.link
                    })
                }
            }
        }
    }, [])

    return (
        <>
            <div className={'background_modal'}/>
            <form>
                <div
                    style={animation ? {opacity: 1, transform: 'translate(-50%, 0px)'} : {opacity: 0, transform: 'translate(-50%, -50px)'}}
                    className={'add_form'}
                >
                    <div className="head_modal">
                        <h1>Добавить</h1>
                        <div>
                            <i onClick={setShowModal.bind(null, false)} className="bi bi-x-lg"/>
                        </div>
                    </div>
                    <div style={{marginTop: '10px'}}>
                        <Input
                            value={form.title}
                            change={change}
                            id={'title'}
                            name={'title'}
                            label={'Название'}
                            type={'text'}
                        />
                    </div>
                    <div style={{marginTop: '10px'}}>
                        <label className='label' htmlFor={'description'}>Описание</label>
                        <textarea
                            className={'textarea'}
                            value={form.description}
                            onChange={change}
                            id={'description'}
                            name={'description'}
                        />
                    </div>
                    <div style={{marginTop: '10px'}}>
                        <Input
                            value={form.link}
                            change={change}
                            id={'link'}
                            name={'link'}
                            label={'Ссылка'}
                            type={'text'}
                        />
                    </div>
                    <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
                        <Button value={isUpdateAndAdd ? 'Изменить' : 'Добавить'} width={'200px'} click={() => {}}/>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ModalWindow