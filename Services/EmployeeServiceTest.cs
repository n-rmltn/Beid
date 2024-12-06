using Aries.Repositories.Interfaces;
using Aries.Services.Implementations;
using Moq;
using Microsoft.Extensions.Logging;

namespace AriesTest.Services
{
    /**
     *  Tests for employee service
     *  Using Moq to avoid using actual database
     */
    public class EmployeeServiceTests
    {
        private readonly Mock<IEmployeeRepository> _mockServiceRepository;
        private readonly Mock<IDepartmentRepository> _mockDepartmentRepository;
        private readonly Mock<ILogger<EmployeeService>> _mockLogger;
        private readonly EmployeeService _employeeService;

        public EmployeeServiceTests()
        {
            _mockServiceRepository = new Mock<IEmployeeRepository>();
            _mockDepartmentRepository = new Mock<IDepartmentRepository>();
            _mockLogger = new Mock<ILogger<EmployeeService>>();
            _employeeService = new EmployeeService(_mockServiceRepository.Object, _mockDepartmentRepository.Object, _mockLogger.Object);
        }
    }
}