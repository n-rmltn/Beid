using Aries.Models.ViewModels;
using Aries.Repositories.Interfaces;
using Aries.Services.Implementations;
using Moq;
using Microsoft.Extensions.Logging;

namespace AriesTest.Services
{
    /**
     *  Tests for department service
     *  Using Moq to avoid using actual database
     *  Test by creating mock object, call the service method and verify the result
     */
    public class DepartmentServiceTests
    {
        private readonly Mock<IDepartmentRepository> _mockDepartmentRepository;
        private readonly Mock<ILogger<DepartmentService>> _mockLogger;
        private readonly DepartmentService _departmentService;

        public DepartmentServiceTests()
        {
            _mockDepartmentRepository = new Mock<IDepartmentRepository>();
            _mockLogger = new Mock<ILogger<DepartmentService>>();
            _departmentService = new DepartmentService(_mockDepartmentRepository.Object, _mockLogger.Object);
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnDepartments()
        {
            // Mock data
            var departments = new List<DepartmentViewModel>
            {
                new DepartmentViewModel { Id = 1, Name = "HR" },
                new DepartmentViewModel { Id = 2, Name = "IT" }
            };
            _mockDepartmentRepository.Setup(repo => repo.GetDepartmentsAsync())
                .ReturnsAsync(departments);

            var result = await _departmentService.GetAllAsync();

            // Should have 2 departments and call GetDepartmentsAsync once
            Assert.NotNull(result);
            Assert.Equal(2, result.Count());
            _mockDepartmentRepository.Verify(repo => repo.GetDepartmentsAsync(), Times.Once);
        }
    }
}