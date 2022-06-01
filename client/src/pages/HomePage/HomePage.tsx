import React from "react";
import {ModalWindow} from "../../components";
import {useHttp} from "../../config/hooks/useHttp";
import {useMessage} from "../../config/hooks/useMessage";
import './home_page.scss'

interface IWorking {
    title: string
    description: string
    link: string
    id: number
}

const HomePage: React.FC = () => {
    const [working, setWorking] = React.useState<IWorking[]>([])
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [isUpdateAndAdd, setIsUpdateAndAdd] = React.useState<{type: boolean, id: number | null}>({
        type: false,
        id: null
    })

    const changeModal = (type: boolean, id: number | null): void => {
        setShowModal(true)
        if (isUpdateAndAdd) {
            return setIsUpdateAndAdd({type, id})
        }
        setIsUpdateAndAdd({type, id})
    }

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className={'item_card'}>
                    {
                        working.map((item, index) => (
                            <div className={'container_card'} key={item.id}>
                                <div>{index + 1}.</div>
                                <div className={'txt'}>Название:</div>
                                <div style={{fontSize: '20px'}}>{item.title}</div>
                                <div className={'txt'}>Описание:</div>
                                <div style={{fontSize: '18px'}}>{item.description}</div>
                                <div className={'txt'}>ссылка:</div>
                                <div><a href={item.link} target={'_blank'}>{item.link}</a></div>
                                <div className={'container_icon'}>
                                    <div><i onClick={changeModal.bind(null, true, item.id)} title={'Изменить'} className={"bi bi-pencil-square"}/></div>
                                    <div><i title={'Удалить'} className="bi bi-trash"/></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={'plus'}>
                <i onClick={changeModal.bind(null, false, null)} className={"bi bi-plus-lg"}/>
            </div>
            {
                showModal &&
                <ModalWindow
                    isUpdateAndAdd={isUpdateAndAdd}
                    working={working}
                    setShowModal={setShowModal}
                />
            }
        </>
    )
}

export default HomePage