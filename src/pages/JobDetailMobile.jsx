import React from 'react'
import { FaShareAlt } from 'react-icons/fa'
import { GiSelfLove } from 'react-icons/gi'
import { useParams } from 'react-router-dom'

const JobDetailMobile = () => {
    const { id } = useParams()
    return (
        <div className="border-tertiary-ghost-color md:border md:border-t-0 md:rounded-b-lg">
            <div className=" lg:block md:h-60">
                <div className="h-[1rem] md:h-[9rem]">
                </div>
                <div className="bg-white relative p-6 md:rounded-b-lg ">
                    <div className="inline-block md:flex md:justify-between">
                        <div className="mb-4">
                            <span className="flex items-end ">
                                <a className="text-current visited:text-inherit hover:text-current" href="/c/kompas-gramedia/jobs/243484/operator-2">
                                    <h1 className="text-title inline-flex items-center md:text-primary-head md:flex lg:mt-16 text-4xl"> Guru Matematika {id}</h1>
                                </a>
                            </span>
                            <ul className="md:flex nt-2">
                                <li className="">
                                    <a className="text-black hover:text-black visited:text-black" href="/job-board/l/Bandung/1">
                                        <span><span itemProp="addressLocality">Bandung</span>, <span itemProp="addressCountry">Indonesia</span></span>
                                    </a>
                                    <br />
                                </li>
                                <li className="md:list-disc md:ml-7">
                                    <a className="text-black hover:text-black visited:text-black" href="/job-board/t/full-time/1">Full time</a>
                                </li>
                            </ul>
                        </div>
                        <div className="text-subdued text-caption md:text-right">
                            <p className=""> Posted about 1 month ago and deadline of application is on 12 Aug </p>
                            <p className=""> Recruiter was hiring about 15 hours ago </p>
                        </div>
                    </div>
                    <div className="mt-4 mb-8 md:flex md:justify-between">
                        <button className="k-w-full md:k-w-auto md:k-inline-block k-btn-primary k-btn-lg k-mb-4 md:k-mb-0 p-4 bg-blue-400 rounded mb-2"> Apply Now </button>
                        <div className="flex gap-4 justify-between">
                            <button className="btn-tertiary btn-lg flex items-center justify-center flex-1 md:flex-none p-4 bg-blue-400 rounded">
                                <GiSelfLove className="h-6 w-6 mr-1"/> Save
                            </button>
                            <button className="btn-tertiary btn-lg flex items-center justify-center flex-1 md:flex-none p-4 bg-blue-400 rounded">
                                <FaShareAlt className="h-6 w-6 mr-1"/>Share
                            </button>
                        </div>
                    </div>
                        <div className="py-8 border-t border-tertiary-color md:flex md:justify-center">
                            <div className="md:w-full md:pr-4 p-space">
                                <div className="mb-4 show-bullets">
                                    <p><strong>Job Descriptions:</strong></p>
                                    <ul>
                                        <li>Mengoperasikan mesin untuk menggabungkan cover dan isi melalui teknik penjilidan.</li>
                                        <li>Melaporkan kegiatan dan hasil produksi melalui pengisian Trax, logbook, laporan produksi, dan laporan penyimpangan guna mengevaluasi proses produksi.</li>
                                        <li>Mengoperasikan mesin Sheet dan mengatasi gangguan produksi untuk kelancaran hasil produksi.</li>
                                    </ul>
                                </div>
                                <div className="md:flex mt-8">
                                    <div className="md:mr-4">
                                        <div className="mb-4">
                                            <div className="text-overline text-subdued">Address</div>
                                            <div className="inline-flex items-center justify-center"> Jl. Raya Rancaekek KM 24. 5 Kav. D3 &amp; D5, Rancaekek, Sawahdadap, Kec. Cimanggung, Kabupaten Sumedang, Jawa Barat </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetailMobile