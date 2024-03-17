import React from 'react'

type TableAttributes = {
    head: string[],
    children: React.ReactNode,
}

function Table({ head, children }: TableAttributes) {
    return (
        <div className='overflow-y-auto h-[90%] scrollbar-hide'>
            <table className="w-full text-sm text-left text-gray-700 ">
                <thead className="text-sm text-sky-800 uppercase sticky top-0 border-t border-t-slate-200 bg-white">
                    <tr>
                        {head.map((d: any, id: number) => (
                            <th key={id} scope="col" className="px-6 py-3">{d}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}

export default Table