import React from "react";
import {Loader, ModalWindow} from "../../components";
import {useHttp} from "../../config/hooks/useHttp";
import {useMessage} from "../../config/hooks/useMessage";
import {AppContext} from "../../config/hooks/Context";
import './home_page.scss'
import {IMessage} from "../../config/types/types";

interface IWorking {
    title: string
    description: string
    link_url: string
    id: number,
    id_user: number
}

interface Res extends IMessage {
    auth: boolean
    data: IWorking[]
}

const HomePage: React.FC = () => {
    const message = useMessage()
    const {request, loader} = useHttp()
    const {user, setAuth} = React.useContext(AppContext)
    const [working, setWorking] = React.useState<IWorking[]>([])
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [isUpdateAndAdd, setIsUpdateAndAdd] = React.useState<{type: boolean, id: number | null}>({
        type: false,
        id: null
    })

    const changeModal = (type: boolean, id: number | null): void => {
        setShowModal(true)
        if (isUpdateAndAdd.type) {
            return setIsUpdateAndAdd({type, id})
        }
        setIsUpdateAndAdd({type, id})
    }

    const getWorking = async (): Promise<void> => {
        try {
            const res: Res = await request(`/working/${user?.id}`)
            setWorking(res.data)
            if (!res.auth) {
                setAuth ? setAuth(res.auth) : null
            }
        } catch (e) {
        }
    }

    const insertAndUpdateApi = async (form: {title: string, description: string, link_url: string}): Promise<void> => {
        try {
            const res: Res = await request(
                '/working',
                isUpdateAndAdd.type ? 'PUT' : 'POST',
                isUpdateAndAdd.type ? {title: form.title, description: form.description, link_url: form.link_url, id_working: isUpdateAndAdd.id} : {title: form.title, description: form.description, link_url: form.link_url, id_user: user?.id}
            )
            message(res.message, res.type)
            setIsUpdateAndAdd({
                type: false,
                id: null
            })
            setShowModal(false)
            getWorking()
            if (!res.auth) {
                setAuth ? setAuth(res.auth) : null
            }
        } catch (e) {
        }
    }

    const deleteApi = async (id_working: number) => {
        try {
            const res: IMessage = await request(`/working/${id_working}`, 'DELETE')
            getWorking()
            message(res.message, res.type)
        } catch (e) {
        }
    }

    React.useEffect(() => {
        getWorking()
    }, [])

    return (
        <>
            {
                loader &&
                <Loader/>
            }
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className={'item_card'}>
                    {
                        working.length ?
                        working.map((item, index) => (
                            <div className={'container_card'} key={item.id}>
                                <div>{index + 1}.</div>
                                <div className={'txt'}>Название:</div>
                                <div style={{fontSize: '20px'}}>{item.title}</div>
                                <div className={'txt'}>Описание:</div>
                                <div style={{fontSize: '18px'}}>{item.description}</div>
                                <div className={'txt'}>ссылка:</div>
                                <div><a href={item.link_url} target={'_blank'}>{item.link_url}</a></div>
                                <div className={'container_icon'}>
                                    <div><i onClick={changeModal.bind(null, true, item.id)} title={'Изменить'} className={"bi bi-pencil-square"}/></div>
                                    <div><i onClick={deleteApi.bind(null, item.id)} title={'Удалить'} className="bi bi-trash"/></div>
                                </div>
                            </div>
                        )) :
                            <h1 style={{color: 'white'}}>Нет никаких данных!</h1>
                    }
                </div>
            </div>
            <div onClick={changeModal.bind(null, false, null)} className={'plus'}>
                <i className={"bi bi-plus-lg"}/>
            </div>
            {
                showModal &&
                <ModalWindow
                    insertAndUpdateApi={insertAndUpdateApi}
                    isUpdateAndAdd={isUpdateAndAdd}
                    working={working}
                    setShowModal={setShowModal}
                    loader={loader}
                />
            }
        </>
    )
}

export default HomePage