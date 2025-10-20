import { VagasRepository } from "../repositories/vagas.repo";

interface JobData {
  idEmpresa: number;
  title: string;
  location: string;
  description: string;
  skillsTags: string[];
  supportTags: string[];
  compatibility?: number;
  startDate: Date;
  endDate: Date;
  typeContract: string;
  typeWork: string;
  payment: string;
  workLevel: string;
  timeShift: string;
}

interface VagasFilters {
  titulo?: string;
  localizacao?: string;
  tipoContrato?: string | string[];
  tipoTrabalho?: string | string[];
  nivelTrabalho?: string;
  turno?: string;
  empresaId?: string;
  habilidades?: string;
  apoios?: string;
  setor?: string;
  recomendadas?: boolean;
  candidatoId?: string;
}

interface VagasSearchFilters extends VagasFilters {
  habilidadesList?: string[];
  apoiosList?: string[];
  salarioMin?: number;
  salarioMax?: number;
  dataInicioMin?: string;
  dataInicioMax?: string;
  candidatoId?: string;
}

export const VagasService = {
  async list(filters?: VagasFilters) {
    return await VagasRepository.findAll(filters);
  },

  async findById(id: number) {
    return await VagasRepository.findById(id);
  },

  async findByEmpresa(empresaId: number) {
    return await VagasRepository.findByEmpresa(empresaId);
  },

  async create(jobData: JobData) {
    const vagaData = {
      titulo: jobData.title,
      localizacao: jobData.location,
      descricao: jobData.description,
      habilidades: jobData.skillsTags,
      apoios: jobData.supportTags,
      compatibilidade: jobData.compatibility,
      dataInicio: jobData.startDate,
      dataFim: jobData.endDate,
      tipoContrato: jobData.typeContract,
      tipoTrabalho: jobData.typeWork,
      pagamento: jobData.payment,
      nivelTrabalho: jobData.workLevel,
      turno: jobData.timeShift,
      empresaId: jobData.idEmpresa,
    };
    return await VagasRepository.create(vagaData);
  },

  async update(id: number, jobData: Partial<JobData>) {
    const updateData: any = {};
    
    if (jobData.title) updateData.titulo = jobData.title;
    if (jobData.location) updateData.localizacao = jobData.location;
    if (jobData.description) updateData.descricao = jobData.description;
    if (jobData.skillsTags) updateData.habilidades = jobData.skillsTags;
    if (jobData.supportTags) updateData.apoios = jobData.supportTags;
    if (jobData.compatibility) updateData.compatibilidade = jobData.compatibility;
    if (jobData.startDate) updateData.dataInicio = jobData.startDate;
    if (jobData.endDate) updateData.dataFim = jobData.endDate;
    if (jobData.typeContract) updateData.tipoContrato = jobData.typeContract;
    if (jobData.typeWork) updateData.tipoTrabalho = jobData.typeWork;
    if (jobData.payment) updateData.pagamento = jobData.payment;
    if (jobData.workLevel) updateData.nivelTrabalho = jobData.workLevel;
    if (jobData.timeShift) updateData.turno = jobData.timeShift;

    return await VagasRepository.update(id, updateData);
  },

  async delete(id: number) {
    return await VagasRepository.delete(id);
  },

  async search(filters: VagasSearchFilters) {
    return await VagasRepository.search(filters);
  },
};